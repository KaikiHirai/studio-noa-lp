"use client";

import { useId, useState } from "react";

type Fields = {
  name: string;
  email: string;
  tel: string;
  pref1: string;
  pref2: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  name: "",
  email: "",
  tel: "",
  pref1: "",
  pref2: "",
  message: "",
};

const ERR_CLS = "mt-1.5 text-xs text-[#a6412f]";

// フォーム項目の共通ラッパー（モジュールスコープに置き、再レンダー時の再マウント＝フォーカス喪失を防ぐ）
function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-ink">
        {label}
        {required ? (
          <span className="ml-2 text-xs font-normal text-[#a6412f]">必須</span>
        ) : (
          <span className="ml-2 text-xs font-normal text-ink/75">任意</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className={ERR_CLS}>
          {error}
        </p>
      )}
    </div>
  );
}

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "お名前をご入力ください。";
  if (!f.email.trim()) {
    e.email = "メールアドレスをご入力ください。";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
    e.email = "メールアドレスの形式をご確認ください。";
  }
  if (!f.tel.trim()) {
    e.tel = "電話番号をご入力ください。";
  } else if (!/^[0-9+\-()\s]{10,}$/.test(f.tel.trim())) {
    e.tel = "電話番号は数字10桁以上でご入力ください。";
  }
  if (!f.pref1.trim()) e.pref1 = "第1希望の日時をご入力ください。";
  return e;
}

export function TrialForm() {
  const uid = useId();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function update<K extends keyof Fields>(key: K, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // 最初のエラー項目へフォーカス
      const first = document.getElementById(
        `${uid}-${Object.keys(found)[0]}`,
      );
      first?.focus();
      return;
    }
    // 送信はダミー（実運用ではここでAPIへPOST）
    setSending(true);
    await new Promise((r) => setTimeout(r, 600));
    setSending(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-olive bg-base p-8 text-center md:p-12"
      >
        <span
          aria-hidden="true"
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-olive text-olive"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <p className="font-serif text-xl font-medium text-ink">
          お申し込みありがとうございます。
        </p>
        <p className="mt-4 text-[0.9rem] leading-loose text-ink/80">
          担当より24時間以内にご連絡いたします。
          <br />
          しつこい勧誘は行いませんので、ご安心ください。
        </p>
      </div>
    );
  }

  const inputCls =
    "mt-2 w-full rounded border border-line bg-base px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/40 focus:border-olive";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Field
        id={`${uid}-name`}
        label="お名前"
        required
        error={errors.name}
      >
        <input
          id={`${uid}-name`}
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${uid}-name-err` : undefined}
          className={inputCls}
          placeholder="山田 花子"
        />
      </Field>

      <Field id={`${uid}-email`} label="メールアドレス" required error={errors.email}>
        <input
          id={`${uid}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${uid}-email-err` : undefined}
          className={inputCls}
          placeholder="hanako@example.com"
        />
      </Field>

      <Field id={`${uid}-tel`} label="電話番号" required error={errors.tel}>
        <input
          id={`${uid}-tel`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.tel}
          onChange={(e) => update("tel", e.target.value)}
          aria-invalid={!!errors.tel}
          aria-describedby={errors.tel ? `${uid}-tel-err` : undefined}
          className={inputCls}
          placeholder="09012345678"
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={`${uid}-pref1`} label="ご希望日時（第1希望）" required error={errors.pref1}>
          <input
            id={`${uid}-pref1`}
            type="text"
            value={values.pref1}
            onChange={(e) => update("pref1", e.target.value)}
            aria-invalid={!!errors.pref1}
            aria-describedby={errors.pref1 ? `${uid}-pref1-err` : undefined}
            className={inputCls}
            placeholder="例：7/20（土）14時ごろ"
          />
        </Field>
        <Field id={`${uid}-pref2`} label="ご希望日時（第2希望）">
          <input
            id={`${uid}-pref2`}
            type="text"
            value={values.pref2}
            onChange={(e) => update("pref2", e.target.value)}
            className={inputCls}
            placeholder="例：7/22（月）午前中"
          />
        </Field>
      </div>

      <Field id={`${uid}-message`} label="ご相談内容（任意）">
        <textarea
          id={`${uid}-message`}
          rows={3}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${inputCls} resize-y`}
          placeholder="産後の体型が気になる、運動が苦手、など何でもご記入ください。"
        />
      </Field>

      <button
        type="submit"
        disabled={sending}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded bg-olive px-8 py-4 font-bold text-white transition-colors duration-300 hover:bg-olive-hover disabled:opacity-60"
      >
        {sending ? "送信中…" : "この内容で予約する（0円）"}
        {!sending && (
          <span aria-hidden="true" className="text-lg leading-none">
            →
          </span>
        )}
      </button>
      <p className="text-center text-xs text-ink/75">
        送信により
        <a href="/privacy/" className="underline underline-offset-2 hover:text-olive">
          プライバシーポリシー
        </a>
        に同意したものとします。
      </p>
    </form>
  );
}
