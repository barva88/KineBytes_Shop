export default function FAQPage() {
  const faqs = [
    {
      q: "¿El hardware KineBytes es resistente al agua?",
      a: "Sí, todos nuestros conos interactivos y sensores de campo (Beam Agility, Speed Gates) cuentan con certificación IP65, haciéndolos resistentes a polvo, salpicaduras y lluvia ligera. Sin embargo, no deben sumergirse."
    },
    {
      q: "¿Cuánto dura la batería de los conos interactivos?",
      a: "En uso continuo con brillo al 100%, la autonomía es de aproximadamente 10 horas. Con un uso intermitente en sesiones de entrenamiento estándar, pueden durar varios días. La carga completa tarda 2 horas."
    },
    {
      q: "¿Necesito una licencia de software para usar el hardware?",
      a: "El hardware se puede utilizar en su modo offline básico sin licencia. Sin embargo, para acceder a métricas avanzadas, almacenamiento en la nube, perfiles de atletas y la integración con el ecosistema web/mobile, se requiere una Licencia Pro o Team."
    },
    {
      q: "¿Cuáles son los métodos de pago aceptados?",
      a: "Aceptamos todas las principales tarjetas de crédito y débito mediante procesamiento seguro, así como transferencias bancarias para licencias Enterprise e instituciones (contáctanos previamente)."
    },
    {
      q: "¿Puedo sincronizar los datos de entrenamiento con software de terceros?",
      a: "Con la Licencia Team Enterprise, proporcionamos acceso a nuestra API para exportación programática de datos en formato JSON o CSV."
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Preguntas Frecuentes</h1>
        <p className="text-lg text-zinc-400">Respuestas rápidas a las consultas más comunes de nuestros usuarios.</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-kb-card border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-emerald-400 mb-3">{faq.q}</h3>
            <p className="text-zinc-300 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
