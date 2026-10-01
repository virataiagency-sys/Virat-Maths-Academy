import React, { useState } from 'react';
import {
  Package,
  X,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AndroidBundleModal({ isOpen, onClose }: Props) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const appUrl = 'https://ais-pre-bvm4l3uzdxsaajuxzpwmgh-694768886112.asia-east1.run.app';
  const packageId = 'com.viratmathsacademy.app';
  const pwabuilderUrl = `https://www.pwabuilder.com/report?site=${encodeURIComponent(appUrl)}`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const gradleCommand = `cd android\n./gradlew bundleRelease`;
  const bubblewrapCommand = `npx @bubblewrap/cli build`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>Google Play Release Bundle (.aab)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/30">
                  TWA Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Package: <code className="text-emerald-400 font-mono">{packageId}</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Method 1: Instant 1-Click via PWABuilder (Recommended for Immediate .aab) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Method 1: Instant 1-Click .AAB Generator (PWABuilder)</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                Fastest
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Google & Microsoft's official <strong>PWABuilder</strong> packages the live app URL directly into a signed Google Play <code className="text-amber-300">.aab</code> (Android App Bundle) without requiring Android Studio.
            </p>
            <a
              href={pwabuilderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>Generate .aab on PWABuilder</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Method 2: Native Android Gradle Project Included in Codebase */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Terminal className="w-4 h-4" />
                <span>Method 2: Native Gradle Project in <code className="text-slate-200">/android</code></span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">
                Gradle 8.2 + SDK 34
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              A full Trusted Web Activity (TWA) Android project has been generated in the <code className="text-slate-200 font-mono">android/</code> directory with <code className="text-slate-200 font-mono">com.google.androidbrowserhelper</code> and Digital Asset Links integration.
            </p>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-[11px] flex items-center justify-between">
              <code>{gradleCommand}</code>
              <button
                onClick={() => handleCopy(gradleCommand, 'gradle')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedSection === 'gradle' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'gradle' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Output path: <code className="text-slate-400">android/app/build/outputs/bundle/release/app-release.aab</code>
            </p>
          </div>

          {/* Method 3: Automated GitHub Actions CI/CD */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <span>Method 3: Automated GitHub Actions Workflow</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Workflow file <code className="text-slate-200 font-mono">.github/workflows/build-android-aab.yml</code> is configured. When committed to GitHub, the workflow automatically builds and uploads <code className="text-slate-200">app-release-aab</code> as a downloadable artifact.
            </p>
          </div>

          {/* Digital Asset Links & Manifest Specs */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Digital Asset Links Verification</span>
            </div>
            <p className="text-slate-400">
              The <code className="text-slate-300">/.well-known/assetlinks.json</code> file is configured on the host domain with the SHA-256 fingerprint, enabling Chrome to launch in full-screen standalone mode with zero browser address bar.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Target: Google Play Console (.aab)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
