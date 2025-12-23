'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Company, Section } from '@/types';

const ItemType = 'SECTION';

/* ---------------- Section Item ---------------- */

interface SectionItemProps {
  section: Section;
  index: number;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
  updateSection: (id: string, title: string, content: string) => void;
  removeSection: (id: string) => void;
}

const SectionItem = ({
  section,
  index,
  moveSection,
  updateSection,
  removeSection,
}: SectionItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveSection(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`bg-white border rounded-xl p-4 mb-4 shadow-sm ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
     <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
  <div className="flex items-center gap-2 flex-1">
    <span className="cursor-move text-gray-400">☰</span>

    <input
      value={section.title}
      onChange={e =>
        updateSection(section.id, e.target.value, section.content)
      }
      className="flex-1 border rounded px-2 py-1 text-sm"
      placeholder="Section title"
    />
  </div>

  <button
    onClick={() => removeSection(section.id)}
    className="
      text-white bg-red-600 text-sm rounded-xl
      py-1.5 px-3
      w-full md:w-auto
      md:ml-2
    "
  >
    Remove
  </button>
</div>


      <ReactQuill
        value={section.content}
        onChange={content =>
          updateSection(section.id, section.title, content)
        }
        placeholder="Section content"
      />
    </div>
  );
};

/* ---------------- Editor ---------------- */

interface Props {
  company: Company;
}

export default function Editor({ company }: Props) {
  const [theme, setTheme] = useState(company.theme);
  const [sections, setSections] = useState<Section[]>(company.sections);

  const [logoPreview, setLogoPreview] = useState<string | null>(
    company.theme.logoUrl || null
  );
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    company.theme.bannerUrl || null
  );

  useEffect(() => {
    setTheme(company.theme);
    setSections(company.sections.sort((a, b) => a.order - b.order));
    setLogoPreview(company.theme.logoUrl || null);
    setBannerPreview(company.theme.bannerUrl || null);
  }, [company]);

  const handleThemeChange = (key: string, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const addSection = () => {
    setSections(prev => [
      ...prev,
      { id: uuidv4(), title: 'New Section', content: '', order: prev.length },
    ]);
  };

  const updateSection = (id: string, title: string, content: string) => {
    setSections(prev =>
      prev.map(s => (s.id === id ? { ...s, title, content } : s))
    );
  };

  const removeSection = (id: string) => {
    setSections(prev =>
      prev.filter(s => s.id !== id).map((s, i) => ({ ...s, order: i }))
    );
  };

  const moveSection = (from: number, to: number) => {
    const updated = [...sections];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setSections(updated.map((s, i) => ({ ...s, order: i })));
  };

  const uploadFile = async (file: File, bucket: string) => {
    const path = `${company.slug}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error) return null;

    return supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl;
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoPreview(URL.createObjectURL(file));
    const url = await uploadFile(file, 'logos');
    if (url) handleThemeChange('logoUrl', url);
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerPreview(URL.createObjectURL(file));
    const url = await uploadFile(file, 'banners');
    if (url) handleThemeChange('bannerUrl', url);
  };

  const saveChanges = async () => {
    await supabase
      .from('companies')
      .update({ theme, sections })
      .eq('id', company.id);

    alert('Changes saved');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

        {/* MAIN */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-[var(--primary-color)]">
            Edit Careers Page
          </h1>

          {/* THEME */}
          <section className="bg-white rounded-2xl border p-6 mb-10">
            <h2 className="text-xl font-semibold mb-6">Theme Settings</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Primary Color</label>
                <input
                  type="color"
                  value={theme.primaryColor || '#5139ed'}
                  onChange={e =>
                    handleThemeChange('primaryColor', e.target.value)
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Secondary Color</label>
                <input
                  type="color"
                  value={theme.secondaryColor}
                  onChange={e =>
                    handleThemeChange('secondaryColor', e.target.value)
                  }
                />
              </div>

              {/* LOGO */}
              <div>
                <label className="text-sm font-medium mb-1 block">Logo</label>
                {logoPreview ? (
                  <div className="relative inline-block">
                    <img
                      src={logoPreview}
                      className="h-14 rounded border"
                    />
                    <button
                      onClick={() => {
                        setLogoPreview(null);
                        handleThemeChange('logoUrl', '');
                      }}
                      className="absolute -top-2 -right-2 bg-black text-white h-6 w-6 rounded-full text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <input type="file" onChange={handleLogoUpload} />
                )}
              </div>

              {/* BANNER */}
              <div>
                <label className="text-sm font-medium mb-1 block">Banner</label>
                {bannerPreview ? (
                  <div className="relative">
                    <img
                      src={bannerPreview}
                      className="h-28 w-full object-cover rounded border"
                    />
                    <button
                      onClick={() => {
                        setBannerPreview(null);
                        handleThemeChange('bannerUrl', '');
                      }}
                      className="absolute top-2 right-2 bg-black text-white h-6 w-6 rounded-full text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <input type="file" onChange={handleBannerUpload} />
                )}
              </div>

              {/* CULTURE VIDEO */}
<div className="sm:col-span-2">
  <label className="text-sm font-medium mb-1 block">
    Culture Video URL
  </label>

  <input
    type="url"
    value={theme.videoUrl || ''}
    onChange={e => handleThemeChange('videoUrl', e.target.value)}
    placeholder="https://youtube.com/watch?v=..."
    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
  />

  {theme.videoUrl && (
    <div className="relative mt-3 rounded-xl overflow-hidden border">
      <iframe
        src={theme.videoUrl.replace('watch?v=', 'embed/')}
        className="w-full h-48"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <button
        onClick={() => handleThemeChange('videoUrl', '')}
        className="absolute top-2 right-2 bg-black/70 text-white h-7 w-7 rounded-full text-xs flex items-center justify-center"
      >
        ✕
      </button>
    </div>
  )}
</div>

            </div>
          </section>

          {/* CONTENT */}
          <section className="bg-white rounded-2xl border p-6">
            <h2 className="text-xl font-semibold mb-4">Content Sections</h2>

            {sections.map((section, index) => (
              <SectionItem
                key={section.id}
                section={section}
                index={index}
                moveSection={moveSection}
                updateSection={updateSection}
                removeSection={removeSection}
              />
            ))}

            <button
              onClick={addSection}
              className="mt-4 border px-4 py-2 rounded"
            >
              + Add Section
            </button>
          </section>
        </div>

        {/* ACTIONS */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white border rounded-2xl p-5">
            <button
              onClick={saveChanges}
              className="w-full bg-[var(--primary-color)] text-white py-3 rounded-xl font-semibold"
            >
              Save Changes
            </button>
          </div>
        </aside>
      </div>
    </DndProvider>
  );
}
