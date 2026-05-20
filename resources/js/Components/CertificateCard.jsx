import { motion } from "framer-motion";
import { Award, Building2, Calendar, Hash, ExternalLink, Sparkles } from "lucide-react";

export default function CertificateCard({ certificate, index = 0 }) {
    const {
        title,
        issuer,
        image,
        date,
        credential,
        skills,
        verifyUrl,
    } = certificate;

    const tags = Array.isArray(skills) ? skills : [];

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.55,
                delay: Math.min(index * 0.06, 0.36),
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative"
        >
            <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-xl transition duration-500 group-hover:opacity-100"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(139,92,246,0.45), rgba(34,211,238,0.35), rgba(167,139,250,0.25))",
                }}
                aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl">
                <div
                    className="pointer-events-none absolute inset-0 rounded-[0.85rem] opacity-80"
                    style={{
                        background:
                            "linear-gradient(145deg, rgba(139,92,246,0.14), rgba(34,211,238,0.08) 45%, transparent 70%)",
                    }}
                    aria-hidden
                />
                <div className="relative rounded-xl bg-zinc-950/55 p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-stretch">
                        <div className="relative mx-auto aspect-[4/3] w-full max-w-[200px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/25 via-zinc-900 to-cyan-500/20 sm:mx-0 sm:max-w-[180px]">
                            {image ? (
                                <img
                                    src={image}
                                    alt=""
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                                />
                            ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-violet-300 shadow-[0_0_24px_rgba(139,92,246,0.35)]">
                                        <Award className="h-6 w-6" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                                        Credential
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="min-w-0 space-y-2">
                                    <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                                        {title}
                                    </h3>
                                    <p className="flex items-center gap-2 text-sm text-zinc-400">
                                        <Building2 className="h-4 w-4 shrink-0 text-violet-300/90" strokeWidth={1.5} />
                                        <span className="truncate">{issuer}</span>
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-200/90">
                                    <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
                                    {date}
                                </span>
                            </div>

                            <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                                <Hash className="h-3.5 w-3.5 text-zinc-600" strokeWidth={1.5} />
                                <span className="font-mono text-[11px] text-zinc-400">{credential}</span>
                            </p>

                            {tags.length > 0 && (
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <li
                                            key={tag}
                                            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <motion.a
                                    href={verifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/15 to-cyan-500/20 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(139,92,246,0.22)] transition hover:border-violet-400/40 hover:shadow-[0_0_36px_rgba(34,211,238,0.18)]"
                                >
                                    <Sparkles className="h-4 w-4 text-cyan-200" strokeWidth={1.5} />
                                    Verify certificate
                                    <ExternalLink className="h-4 w-4 opacity-70" strokeWidth={1.5} />
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
