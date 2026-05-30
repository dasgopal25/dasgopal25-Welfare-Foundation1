import { useState, useEffect } from 'react';
import { adminGetSettings, adminUpdateSettings } from '../../api/settingsApi';
import { THEMES, useTheme } from '../../context/ThemeContext';

const FONT_SIZE_PRESETS = {
  small:   { label:'Small',  vars:{ '--font-size-base':'0.875rem','--font-size-lg':'1rem','--font-size-xl':'1.125rem','--font-size-2xl':'1.25rem','--font-size-3xl':'1.5rem','--font-size-4xl':'1.875rem' }},
  medium:  { label:'Medium', vars:{ '--font-size-base':'1rem','--font-size-lg':'1.125rem','--font-size-xl':'1.25rem','--font-size-2xl':'1.5rem','--font-size-3xl':'1.875rem','--font-size-4xl':'2.25rem' }},
  large:   { label:'Large',  vars:{ '--font-size-base':'1.125rem','--font-size-lg':'1.25rem','--font-size-xl':'1.375rem','--font-size-2xl':'1.75rem','--font-size-3xl':'2.125rem','--font-size-4xl':'2.625rem' }},
};

export default function ThemeManager() {
  const { theme: activeTheme, changeTheme } = useTheme();
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [fontSize, setFontSize]   = useState('medium');
  const [preview, setPreview]     = useState(activeTheme);

  // Load saved settings
  useEffect(() => {
    adminGetSettings().then(r => {
      const s = r.data.data;
      if (s.active_theme) { setPreview(s.active_theme); changeTheme(s.active_theme); }
      if (s.font_size_preset) setFontSize(s.font_size_preset);
    }).catch(()=>{});
  }, []);

  // Live preview on hover/click
  const handlePreview = (key) => {
    setPreview(key);
    changeTheme(key);
  };

  const handleFontSize = (key) => {
    setFontSize(key);
    const vars = FONT_SIZE_PRESETS[key].vars;
    Object.entries(vars).forEach(([k,v]) => document.documentElement.style.setProperty(k,v));
  };

  const save = async () => {
    setSaving(true);
    try {
      const settings = [
        { key:'active_theme', value:preview, group:'theme' },
        { key:'font_size_preset', value:fontSize, group:'theme' },
        // Merge font size vars into active theme
        ...Object.entries(FONT_SIZE_PRESETS[fontSize].vars).map(([k,v]) => ({
          key: k.replace('--','css_'), value:v, group:'theme'
        })),
      ];
      await adminUpdateSettings({ settings });
      setSaved(true);
      setTimeout(()=>setSaved(false), 3000);
    } catch { alert('Failed to save theme'); }
    finally { setSaving(false); }
  };

  const themeKeys = Object.keys(THEMES);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold" style={{ color:'var(--c-primary)' }}>Theme Manager</h1>
        <p className="text-sm mt-1" style={{ color:'var(--c-text-muted)' }}>
          Choose a color theme and font size. Changes apply site-wide instantly for all visitors.
        </p>
      </div>

      {saved && (
        <div className="mb-4 p-3 rounded-xl text-sm bg-green-50 text-green-700 border border-green-200">
          ✅ Theme saved! All visitors will now see the new theme.
        </div>
      )}

      {/* Theme Selector */}
      <div className="rounded-2xl p-6 mb-6 border" style={{ backgroundColor:'var(--c-bg)', borderColor:'color-mix(in srgb, var(--c-primary) 15%, transparent)' }}>
        <h2 className="font-display font-semibold text-lg mb-5" style={{ color:'var(--c-primary)' }}>
          🎨 Color Themes <span className="text-sm font-normal" style={{ color:'var(--c-text-muted)' }}>(7 available)</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {themeKeys.map(key => {
            const th = THEMES[key];
            const isActive = preview === key;
            return (
              <button key={key} onClick={() => handlePreview(key)}
                className="relative rounded-2xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 text-left"
                style={{ borderColor: isActive ? 'var(--c-accent)' : 'transparent',
                         boxShadow: isActive ? '0 0 0 3px color-mix(in srgb, var(--c-accent) 40%, transparent)' : '0 2px 8px rgba(0,0,0,0.1)' }}>
                {/* Color swatches */}
                <div className="flex h-16">
                  {th.preview.map((col,i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor:col }} />
                  ))}
                </div>
                {/* Label */}
                <div className="p-3" style={{ backgroundColor:'var(--c-bg-alt)' }}>
                  <p className="font-semibold text-sm" style={{ color:'var(--c-text)' }}>{th.label}</p>
                  <p className="text-xs" style={{ color:'var(--c-text-muted)' }}>{th.labelBn}</p>
                </div>
                {/* Active checkmark */}
                {isActive && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ backgroundColor:'var(--c-accent)' }}>✓</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Font Size Selector */}
      <div className="rounded-2xl p-6 mb-6 border" style={{ backgroundColor:'var(--c-bg)', borderColor:'color-mix(in srgb, var(--c-primary) 15%, transparent)' }}>
        <h2 className="font-display font-semibold text-lg mb-5" style={{ color:'var(--c-primary)' }}>
          🔤 Font Size
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(FONT_SIZE_PRESETS).map(([key, preset]) => (
            <button key={key} onClick={() => handleFontSize(key)}
              className="rounded-2xl p-5 border-2 transition-all text-center"
              style={{ borderColor: fontSize===key ? 'var(--c-accent)' : 'color-mix(in srgb, var(--c-primary) 15%, transparent)',
                       backgroundColor: fontSize===key ? 'color-mix(in srgb, var(--c-primary) 8%, transparent)' : 'var(--c-bg-alt)' }}>
              <span style={{ fontSize: key==='small'?'1.25rem':key==='medium'?'1.75rem':'2.25rem', color:'var(--c-primary)', fontFamily:'Playfair Display,serif', fontWeight:'bold' }}>Aa</span>
              <p className="font-semibold text-sm mt-2" style={{ color:'var(--c-text)' }}>{preset.label}</p>
              <p className="text-xs" style={{ color:'var(--c-text-muted)' }}>
                {key==='small'?'14px base':key==='medium'?'16px base':'18px base'}
              </p>
              {fontSize===key && (
                <div className="mt-2 text-xs font-bold" style={{ color:'var(--c-accent)' }}>✓ Active</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview Strip */}
      <div className="rounded-2xl p-6 mb-6 border" style={{ backgroundColor:'var(--c-bg)', borderColor:'color-mix(in srgb, var(--c-primary) 15%, transparent)' }}>
        <h2 className="font-display font-semibold mb-4" style={{ color:'var(--c-primary)' }}>👁️ Live Preview</h2>
        <div className="rounded-xl overflow-hidden border" style={{ borderColor:'color-mix(in srgb, var(--c-primary) 20%, transparent)' }}>
          {/* Mini hero */}
          <div className="py-8 px-6 text-center text-white theme-hero-bg">
            <p className="font-display font-bold mb-2" style={{ fontSize:'var(--font-size-2xl)' }}>Gazipur Kismat Welfare Foundation</p>
            <p className="text-white/80" style={{ fontSize:'var(--font-size-base)' }}>Serving humanity with compassion</p>
            <div className="flex gap-3 justify-center mt-4">
              <span className="px-4 py-2 rounded-full text-white text-sm font-semibold" style={{ backgroundColor:'var(--c-accent)' }}>Our Work</span>
              <span className="px-4 py-2 rounded-full text-white text-sm font-semibold border border-white/50">Join Us</span>
            </div>
          </div>
          {/* Mini content */}
          <div className="p-4 grid grid-cols-3 gap-3" style={{ backgroundColor:'var(--c-bg-alt)' }}>
            {['Education','Health','Community'].map(t => (
              <div key={t} className="p-3 rounded-xl text-center theme-card">
                <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor:'var(--c-primary)' }}>✦</div>
                <p className="font-semibold text-xs" style={{ color:'var(--c-primary)' }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button onClick={save} disabled={saving}
        className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all disabled:opacity-60 hover:opacity-90"
        style={{ backgroundColor:'var(--c-primary)' }}>
        {saving ? '⏳ Saving...' : `💾 Save Theme — ${THEMES[preview]?.label}`}
      </button>
      <p className="text-xs text-center mt-2" style={{ color:'var(--c-text-muted)' }}>
        This will update the theme for all website visitors immediately.
      </p>
    </div>
  );
}