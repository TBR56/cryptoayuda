import { EXCHANGES_LIST, PAISES, COINS, TOPICS } from './data';

// ==========================================
// PSEUDO-RANDOM HELPERS
// ==========================================
const getSeed = (str: string) => str.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
const pick = <T>(arr: T[], seed: number, offset: number = 0): T => arr[Math.floor(seededRandom(seed + offset) * arr.length)];

// ==========================================
// LEGACY BLOCKS (REUSED FOR DEPTH)
// ==========================================
const CONTEXT_BLOCKS = [
    "Históricamente, {SUBJECT} ha demostrado una correlación significativa con los movimientos macroeconómicos globales. Sin embargo, los datos on-chain sugieren que esta vez podría ser diferente. Las ballenas (whales) han estado acumulando posiciones discretamente, lo que suele ser un indicador alcista previo a un rally masivo. No obstante, el índice de miedo y codicia (Fear & Greed Index) todavía muestra cautela entre los inversores minoristas.",
    "Para entender la magnitud de este evento, debemos mirar atrás. Durante el ciclo alcista anterior, {SUBJECT} tuvo un comportamiento similar justo antes de romper su máximo histórico (ATH). La diferencia clave hoy es la madurez del ecosistema y la entrada de capital institucional a través de ETFs y fondos regulados, lo que aporta una capa de estabilidad que no existía hace cuatro años.",
    "El análisis técnico en el gráfico de 4 horas muestra una divergencia alcista en el RSI, mientras que las medias móviles de 50 y 200 días están a punto de formar un 'Golden Cross'. Si bien el análisis técnico no es una bola de cristal, estos patrones suelen atraer a traders algorítmicos que inyectan liquidez al mercado, impulsando el precio hacia niveles de resistencia clave."
];

const ANALYSIS_BLOCKS = [
    "Desde una perspectiva fundamental, la red de {SUBJECT} nunca ha estado más saludable. El número de direcciones activas diarias ha crecido un 15% mes a mes, y el volumen de transacciones sigue en aumento. Esto contradice la narrativa bajista que algunos medios tradicionales intentan imponer. La tecnología subyacente sigue escalando y resolviendo el trilema de la blockchain: seguridad, escalabilidad y descentralización.",
    "Sin embargo, no todo es color de rosa. Los riesgos regulatorios en jurisdicciones como Estados Unidos y la Unión Europea siguen siendo una nube gris sobre {SUBJECT}. La SEC ha mantenido una postura agresiva, y cualquier noticia relacionada con demandas o nuevas leyes podría desencadenar una venta masiva (sell-off) de corto plazo. Es crucial mantener una gestión de riesgo estricta y no sobreapalancarse en estos momentos.",
    "Expertos como Vitalik Buterin o Charles Hoskinson han mencionado en repetidas ocasiones la importancia de la utilidad real sobre la especulación. En este sentido, {SUBJECT} está demostrando casos de uso tangibles en finanzas descentralizadas (DeFi) y tokenización de activos del mundo real (RWA). Esto es lo que, a largo plazo, separa a los proyectos sólidos de las 'memecoins' pasajeras."
];

const CONCLUSION_BLOCKS = [
    "En conclusión, el panorama para {SUBJECT} es complejo pero prometedor. La combinación de factores técnicos fuertes y una adopción fundamental creciente sugiere que podríamos estar ante una oportunidad de compra generacional. Como siempre en crypto: haz tu propia investigación (DYOR) y nunca inviertas dinero que no puedas permitirte perder.",
    "Para finalizar, la clave estará en la paciencia. Los mercados no suben en línea recta, y es probable que veamos correcciones saludables antes de confirmar la próxima tendencia alcista. Mantén tus claves privadas seguras, utiliza exchanges confiables y diversifica tu exposición a activos como {SUBJECT}.",
    "El veredicto de CryptoAyuda es de 'Cautela Optimista'. Las señales están ahí, pero el ruido del mercado puede ser ensordecedor. Si crees en la visión a largo plazo de {SUBJECT}, estos precios podrían considerarse un regalo. Si eres un trader de corto plazo, ajusta tus Stop Loss y prepárate para la volatilidad."
];

const COUNTRY_BLOCKS: Record<string, string> = {
    "Argentina": "En Argentina, la adopción de {SUBJECT} ha crecido como refugio ante la inflación. Es común el uso de plataformas como Lemon Cash o Buenbit para facilitar la entrada desde pesos.",
    "México": "En el mercado mexicano, Bitso lidera la integración de {SUBJECT}, permitiendo incluso el pago de servicios y remesas trasfronterizas de forma eficiente.",
    "España": "La regulación MiCA en España aporta un marco de seguridad jurídica para quienes operan con {SUBJECT}, con exchanges registrados ante el Banco de España.",
    "Colombia": "Colombia se mantiene como uno de los hubs de mayor volumen P2P para {SUBJECT}, con una comunidad activa en ciudades como Medellín y Bogotá.",
    "Chile": "En Chile, la facilidad de transferencias bancarias locales hace que operar con {SUBJECT} sea un proceso de pocos minutos a través de plataformas regionales.",
};

const DEFAULT_COUNTRY_BLOCK = "La adopción local en esta región muestra un interés creciente por {SUBJECT}, impulsada por la digitalización de las finanzas y la búsqueda de alternativas bancarias tradicionales.";

const LONG_INTROS = [
    "El ecosistema de activos digitales ha evolucionado de ser un nicho para entusiastas tecnológicos a convertirse en una columna vertebral de la nueva economía global. En este contexto, entender los detalles técnicos y operativos de {SUBJECT} no es solo una ventaja competitiva, sino una necesidad para proteger el patrimonio.",
    "Cuando analizamos {SUBJECT}, nos enfrentamos a una de las innovaciones más disruptivas de la última década. Sin embargo, con la innovación viene la complejidad, y es ahí donde muchos inversores cometen errores costosos que podrían evitarse con la información adecuada.",
    "La volatilidad del mercado crypto suele opacar los fundamentos tecnológicos sólidos. En el caso de {SUBJECT}, estamos ante un protocolo que desafía las estructuras financieras tradicionales, ofreciendo una transparencia y eficiencia sin precedentes en el manejo de activos.",
    "Nadie dijo que el camino hacia la soberanía financiera fuera sencillo. Investigar sobre {SUBJECT} es el primer paso para dejar de depender de intermediarios y tomar el control total de tus finanzas en un entorno cada vez más digitalizado y descentralizado."
];

const EXPERT_LEVEL_BLOCKS = [
    "Desde un punto de vista puramente técnico, {SUBJECT} utiliza un mecanismo de consenso que optimiza el trilema de las redes blockchain. Esto permite que la latencia de las transacciones se reduzca al mínimo mientras se mantiene un nivel de seguridad institucional. Es vital considerar el impacto del 'hash rate' o el 'total value locked' (TVL) para medir la salud real del ecosistema en el que opera.",
    "La interoperabilidad es la palabra clave en 2025. {SUBJECT} no opera en el vacío; su capacidad para conectarse con otros protocolos a través de 'bridges' o soluciones de capa 2 define su valor residual a largo plazo. Los analistas sugieren que los proyectos que no resuelvan la fragmentación de liquidez quedarán obsoletos ante soluciones integrales como la que propone este activo.",
    "La gobernanza descentralizada (DAOs) es otro factor determinante. En el caso de {SUBJECT}, las decisiones no las toma una junta directiva a puerta cerrada, sino la comunidad mediante votaciones registradas on-chain. Esto elimina el riesgo de un punto único de falla (SPOF) y asegura que los incentivos de los desarrolladores estén alineados con los de los holders de largo plazo."
];

const SECURITY_DEEP_DIVE = [
    "La seguridad en el manejo de {SUBJECT} debe ser proactiva. No basta con usar una contraseña fuerte; la implementación de firmas múltiples (multi-sig) y el uso de técnicas de 'air-gapping' para las llaves privadas son estándares para cualquier portafolio serio. Además, la auditoría constante de los contratos inteligentes con los que interactuamos es el único escudo real contra los exploits en DeFi.",
    "Uno de los mayores riesgos al operar con {SUBJECT} es la ingeniería social. Los atacantes no intentan hackear la blockchain, sino a las personas. El phishing sofisticado y los ataques de 'poisoning' de direcciones son cada vez más comunes. Siempre recomendamos realizar transacciones de prueba con montos pequeños antes de mover grandes volúmenes de capital.",
    "El marco regulatorio está cambiando rápidamente. En jurisdicciones de alta vigilancia, la transparencia de las transacciones con {SUBJECT} puede ser tanto una bendición como un reto para la privacidad. El uso de wallets que respeten la privacidad y la correcta declaración de impuestos son pilares de una estrategia de inversión madura y responsable."
];

const FAQ_TEMPLATE = [
    { q: "¿Es {SUBJECT} una buena inversión para principiantes?", a: "Depende del perfil de riesgo. Aunque tiene fundamentos sólidos, la volatilidad requiere una mentalidad de largo plazo y una gestión de riesgo estricta (no invertir más de lo que puedas perder)." },
    { q: "¿Cuáles son las comisiones estándar al operar con {SUBJECT}?", a: "Las comisiones varían según la red y la congestión del momento. En promedio, las redes modernas ofrecen transacciones por centavos de dólar, mientras que redes legacy pueden ser más costosas en picos de tráfico." },
    { q: "¿Dónde puedo guardar mis {SUBJECT} de forma segura?", a: "La opción más recomendada es una Hardware Wallet (Ledger o Trezor). Para uso diario, una Hot Wallet como MetaMask o Trust Wallet funciona bien, siempre que protejas tu frase semilla." },
    { q: "¿Qué diferencia a {SUBJECT} de sus competidores?", a: "Su principal diferenciador radica en su tecnología de escalabilidad y la comunidad de desarrolladores activa que impulsa actualizaciones constantes para mejorar la eficiencia del protocolo." }
];

export function generateArticleContent(subject: string, type: string, country?: string) {
    const seed = getSeed(subject + type + (country || ""));
    let content = "";

    // 1. ELABORATE INTRO (2 paragraphs)
    content += `<h2>Análisis Maestro de ${subject}</h2>`;
    content += `<p>${pick(LONG_INTROS, seed).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(LONG_INTROS, seed, 1).replace(/{SUBJECT}/g, subject)}</p>`;

    // 2. LOCAL CONTEXT
    if (country) {
        const countryText = COUNTRY_BLOCKS[country] || DEFAULT_COUNTRY_BLOCK;
        content += `<h3>Operando desde ${country}</h3>`;
        content += `<p>${countryText.replace(/{SUBJECT}/g, subject)}</p>`;
        content += `<p>Si te encuentras en ${country}, es fundamental conocer las leyes locales sobre activos digitales. En el caso de ${subject}, las plataformas operativas en la región suelen ofrecer rampas de acceso mediante moneda local (FIAT), lo que facilita enormemente la adopción sin depender de intermediarios internacionales costosos.</p>`;
    }

    // 3. TECHNICAL DEEP DIVE (3 paragraphs)
    content += `<h3>Fundamentos Técnicos y Operativos</h3>`;
    content += `<p>${pick(EXPERT_LEVEL_BLOCKS, seed).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(ANALYSIS_BLOCKS, seed).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(EXPERT_LEVEL_BLOCKS, seed, 2).replace(/{SUBJECT}/g, subject)}</p>`;

    // 4. STEP BY STEP (PRO)
    content += `<h3>Guía Paso a Paso para el Éxito con ${subject}</h3>`;
    content += `<div class="bg-slate-900 border-l-4 border-brand-500 p-6 my-8 rounded-r-xl">`;
    content += `<ol class="space-y-4">
        <li><strong>Fase de Auditoría:</strong> Investiga el whitepaper y los repositorios de GitHub de ${subject}. Una comunidad activa es el mejor indicador de valor.</li>
        <li><strong>Selección de Entorno:</strong> Configura una wallet no-custodial. El control de tus llaves es el control de tu dinero.</li>
        <li><strong>Ejecución Estratégica:</strong> Utiliza exchanges con alta liquidez para evitar el 'slippage'. Si estás en ${country || 'Latinoamérica'}, prioriza exchanges con soporte P2P.</li>
        <li><strong>Monitoreo y Rebalanceo:</strong> No dejes tus activos olvidados. El mercado cambia y tu estrategia con ${subject} debe ser dinámica.</li>
    </ol></div>`;

    // 5. SECURITY & RISKS (2 long paragraphs)
    content += `<h3>Seguridad y Gestión de Riesgos</h3>`;
    content += `<p>${pick(SECURITY_DEEP_DIVE, seed).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(SECURITY_DEEP_DIVE, seed, 1).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<div class="p-4 bg-red-950/20 border border-red-500/20 rounded-lg text-red-200 text-sm">
        <strong>ADVERTENCIA:</strong> Nunca compartas tu frase semilla de 12 o 24 palabras. Ningún soporte técnico de ${subject} te la pedirá jamás. Si lo hacen, es una estafa.
    </div>`;

    // 6. FUTURE PROJECTIONS
    content += `<h3>El Futuro de ${subject}: ¿Qué esperar después de 2025?</h3>`;
    content += `<p>${pick(CONTEXT_BLOCKS, seed).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>La convergencia entre IA y blockchain pondrá a ${subject} en una posición única. La automatización de transacciones mediante agentes inteligentes podría disparar la demanda de este activo, convirtiéndolo en un estándar utilitario dentro del próximo bull run.</p>`;

    // 7. FAQ SECTION (Structured for SEO)
    content += `<h3 class="mt-12">Preguntas Frecuentes (FAQ)</h3>`;
    content += `<div class="space-y-6">`;
    FAQ_TEMPLATE.forEach((item, i) => {
        content += `<div class="border-b border-white/5 pb-4">
            <h4 class="font-bold text-white mb-2">¿${item.q.replace(/{SUBJECT}/g, subject)}?</h4>
            <p class="text-slate-400 text-sm">${item.a.replace(/{SUBJECT}/g, subject)}</p>
        </div>`;
    });
    content += `</div>`;

    // 8. FINAL VERDICT
    content += `<h3>Conclusión Final de CryptoAyuda</h3>`;
    content += `<p>${pick(CONCLUSION_BLOCKS, seed).replace(/{SUBJECT}/g, subject)}</p>`;

    return content;
}

export function generateScamContent(topic: string) {
    return `
<h2>Alerta de Seguridad Máxima: ${topic}</h2>
<p>En el panorama de la ciberdelincuencia financiera, el **${topic}** ha surgido como una de las tácticas más devastadoras debido a su capacidad para aprovechar tanto las vulnerabilidades tecnológicas como psicológicas de los usuarios. En CryptoAyuda hemos documentado casos donde las pérdidas superan las seis cifras debido a la sofisticación de estos grupos organizados.</p>

<h3>¿Cómo se orquesta el fraude de ${topic}?</h3>
<p>Generalmente, los atacantes operan en etapas. Primero, se establece un contacto que parece legítimo, ya sea a través de redes sociales profesionales o de mensajería cifrada. Utilizan perfiles creados artificialmente con años de "historial" falso para generar una sensación de confianza. Una vez enganchada la víctima, presentan la oportunidad relacionada con ${topic} como algo exclusivo, de bajo riesgo y limitado en el tiempo.</p>

<div class="bg-red-500/10 border border-red-500/30 p-6 rounded-xl my-8">
    <h4 class="text-red-400 font-bold mb-4">🚩 2025 Red Flags Checklist</h4>
    <ul class="space-y-2 text-red-200">
        <li>Baja volatilidad prometida con retornos extraordinarios (Incompatible con la realidad del mercado).</li>
        <li>Presión psicológica para invertir de inmediato sin hacer preguntas técnicas.</li>
        <li>Requerimiento de mover fondos a una plataforma desconocida que clona la UI de exchanges reales.</li>
    </ul>
</div>

<h3>Impacto Técnico y Operativo</h3>
<p>Más allá de la pérdida directa de capital, el ataque de ${topic} suele comprometer la identidad digital de la víctima. El uso de malware oculto en "guías de inversión" o apps de escritorio permite a los hackers acceder a cookies de sesión y bypass de 2FA. Es una intrusión total que puede durar meses antes de ser detectada.</p>

<h3>Protocolo de Defensa Activa</h3>
<ol>
    <li><strong>Aislamiento de Hardware:</strong> Si sospechas de un intento de ${topic}, desconecta tus dispositivos de internet inmediatamente.</li>
    <li><strong>Rotación de Seguridad:</strong> Cambia todas tus contraseñas y resetea tus códigos 2FA desde un dispositivo que sepas que está limpio (preferiblemente uno nuevo).</li>
    <li><strong>Denuncia Internacional:</strong> Reporta las direcciones de BTC/ETH involucradas en bases de datos como BitcoinAbuse o ante las autoridades de ciberdelincuencia de tu país.</li>
</ol>

<p>Recuerda que en el mundo crypto, eres tu propio banco. La responsabilidad de proteger tu capital contra estafas como ${topic} recae únicamente en tu capacidad para discernir entre una oportunidad real y una trampa bien estructurada. Mantente alerta y siempre desconfía de lo que parece demasiado bueno para ser verdad.</p>
    `;
}

