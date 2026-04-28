"use client";

import { useState, useEffect, useCallback } from "react";
import type { SiteContent, ServiceItem, ReviewItem } from "@/lib/types";

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [blockedMsg, setBlockedMsg] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLogin = async () => {
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    if (res.status === 403) {
      const data = await res.json();
      setBlocked(true);
      setBlockedMsg(data.error);
      return;
    }
    if (!res.ok) {
      setError("PIN incorrecto");
      return;
    }
    setAuthed(true);
    loadContent();
  };

  const loadContent = useCallback(async () => {
    const res = await fetch("/api/content");
    const data = await res.json();
    setContent(data);
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setSaved(false);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleImageUpload = async (
    field: string,
    file: File,
    index?: number
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "x-admin-pin": pin },
      body: formData,
    });
    const { url } = await res.json();

    if (!content) return;
    if (field === "heroImage") {
      setContent({ ...content, heroImage: url });
    } else if (field === "aboutImage") {
      setContent({ ...content, aboutImage: url });
    } else if (field === "serviceImage" && index !== undefined) {
      const services = [...content.services];
      services[index] = { ...services[index], image: url };
      setContent({ ...content, services });
    }
  };

  const updateField = (field: keyof SiteContent, value: string) => {
    if (!content) return;
    setContent({ ...content, [field]: value });
  };

  const updateService = (
    index: number,
    key: keyof ServiceItem,
    value: string
  ) => {
    if (!content) return;
    const services = [...content.services];
    services[index] = { ...services[index], [key]: value };
    setContent({ ...content, services });
  };

  const addService = () => {
    if (!content) return;
    setContent({
      ...content,
      services: [
        ...content.services,
        { name: "Nuevo", description: "", price: "" },
      ],
    });
  };

  const removeService = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      services: content.services.filter((_, i) => i !== index),
    });
  };

  const updateReview = (
    index: number,
    key: keyof ReviewItem,
    value: string | number
  ) => {
    if (!content) return;
    const reviews = [...content.reviews];
    reviews[index] = { ...reviews[index], [key]: value };
    setContent({ ...content, reviews });
  };

  const addReview = () => {
    if (!content) return;
    setContent({
      ...content,
      reviews: [...content.reviews, { text: "", author: "", stars: 5 }],
    });
  };

  const removeReview = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      reviews: content.reviews.filter((_, i) => i !== index),
    });
  };

  const updateHour = (key: string, value: string) => {
    if (!content) return;
    setContent({ ...content, hours: { ...content.hours, [key]: value } });
  };

  // Blocked screen
  if (blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Acceso suspendido
          </h1>
          <p className="text-gray-600">{blockedMsg}</p>
        </div>
      </div>
    );
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Panel de Administración
          </h1>
          <input
            type="password"
            placeholder="Ingresá tu PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={6}
          />
          {error && (
            <p className="text-red-500 text-center text-sm mb-4">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Cargando...</p>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Admin</h1>
          <div className="flex gap-3">
            {saved && (
              <span className="text-green-600 font-medium self-center">
                Guardado
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold px-6 py-2 rounded-lg transition-colors"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Hero */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Sección Principal (Hero)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Título
              </label>
              <input
                type="text"
                value={content.heroTitle}
                onChange={(e) => updateField("heroTitle", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Subtítulo
              </label>
              <input
                type="text"
                value={content.heroSubtitle}
                onChange={(e) => updateField("heroSubtitle", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Texto del botón
              </label>
              <input
                type="text"
                value={content.heroCta}
                onChange={(e) => updateField("heroCta", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Imagen de fondo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImageUpload("heroImage", f);
                }}
                className="w-full"
              />
              {content.heroImage && (
                <img
                  src={content.heroImage}
                  alt="Preview"
                  className="mt-2 h-32 object-cover rounded"
                />
              )}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Sobre Nosotros
          </h2>
          <textarea
            value={content.aboutText}
            onChange={(e) => updateField("aboutText", e.target.value)}
            rows={5}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Imagen
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImageUpload("aboutImage", f);
              }}
              className="w-full"
            />
            {content.aboutImage && (
              <img
                src={content.aboutImage}
                alt="Preview"
                className="mt-2 h-32 object-cover rounded"
              />
            )}
          </div>
        </section>

        {/* Services */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Servicios / Menú
            </h2>
            <button
              onClick={addService}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              + Agregar
            </button>
          </div>
          <div className="space-y-4">
            {content.services.map((item, i) => (
              <div key={i} className="border rounded-lg p-4 relative">
                <button
                  onClick={() => removeService(i)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
                >
                  Eliminar
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={item.name}
                    onChange={(e) => updateService(i, "name", e.target.value)}
                    className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Descripción"
                    value={item.description || ""}
                    onChange={(e) =>
                      updateService(i, "description", e.target.value)
                    }
                    className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Precio"
                    value={item.price || ""}
                    onChange={(e) => updateService(i, "price", e.target.value)}
                    className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleImageUpload("serviceImage", f, i);
                    }}
                    className="text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Reseñas</h2>
            <button
              onClick={addReview}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              + Agregar
            </button>
          </div>
          <div className="space-y-4">
            {content.reviews.map((review, i) => (
              <div key={i} className="border rounded-lg p-4 relative">
                <button
                  onClick={() => removeReview(i)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
                >
                  Eliminar
                </button>
                <div className="space-y-3">
                  <textarea
                    placeholder="Texto de la reseña"
                    value={review.text}
                    onChange={(e) => updateReview(i, "text", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Autor"
                      value={review.author}
                      onChange={(e) =>
                        updateReview(i, "author", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={review.stars}
                      onChange={(e) =>
                        updateReview(i, "stars", Number(e.target.value))
                      }
                      className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n} estrella{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact info */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Datos de Contacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Teléfono
              </label>
              <input
                type="text"
                value={content.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Dirección
              </label>
              <input
                type="text"
                value={content.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={content.email || ""}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Instagram (@)
              </label>
              <input
                type="text"
                value={content.socialInstagram || ""}
                onChange={(e) => updateField("socialInstagram", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Hours */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Horarios</h2>
          <div className="space-y-3">
            {Object.entries(content.hours).map(([day, time]) => (
              <div key={day} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={day}
                  readOnly
                  className="flex-1 px-3 py-2 border rounded bg-gray-50 text-gray-600"
                />
                <input
                  type="text"
                  value={time}
                  onChange={(e) => updateHour(day, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
