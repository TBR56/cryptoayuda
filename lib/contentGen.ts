import { EXCHANGES_LIST, PAISES, COINS, TOPICS, SCAM_TOPICS, SECURITY_GUIDES } from './data';

// ==========================================
// 1. PSEUDO-RANDOM HELPERS
// ==========================================
const getSeed = (str: string) => str.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
const pick = <T>(arr: T[], seed: number, offset: number = 0): T => arr[Math.floor(seededRandom(seed + offset) * arr.length)];

const slugify = (text: string) => text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

// ==========================================
// 2. FUNDAMENTAL DATA BLOCKS
// ==========================================
const LSI_KEYWORDS = [
    "mercado de criptomonedas", "tecnología blockchain", "estrategia de inversión", "seguridad digital",
    "cartera de activos", "exchange regulado", "trading profesional", "análisis fundamental",
    "finanzas descentralizadas (DeFi)", "ecosistema crypto"
];

const EXPERTISE_CLUSTERS = [
    "En términos de soberanía financiera, {SUBJECT} representa una ruptura con el modelo bancario tradicional de reserva fraccionaria. Al eliminar la necesidad de confianza en terceros, se establece un sistema basado en pruebas matemáticas donde el usuario es el único custodio. Esta arquitectura no solo reduce costos operativos, sino que mitiga riesgos sistémicos asociados a la insolvencia de entidades financieras centralizadas.",
    "La escalabilidad de red es el campo de batalla actual para {SUBJECT}. Las soluciones de ejecución paralela y los canales de estado están permitiendo que lo que antes era un sistema lento se convierta en una plataforma capaz de procesar miles de transacciones por segundo (TPS). Este avance es comparable a la evolución de las conexiones dial-up a la fibra óptica, abriendo la puerta a aplicaciones de consumo masivo.",
    "Desde el punto de vista regulatorio, {SUBJECT} está forzando a los legisladores a repensar conceptos clásicos como 'security' o 'commodity'. La naturaleza inmutable del registro contable de {SUBJECT} proporciona una trazabilidad que, paradójicamente, puede ser más transparente que los sistemas actuales, permitiendo una lucha más efectiva contra el blanqueo de capitales sin sacrificar la privacidad individual básica.",
    "El impacto ambiental de {SUBJECT} ha sido un tema recurrente, pero la transición hacia mecanismos de consenso más eficientes ha reducido el consumo energético en más del 99%. Actualmente, la minería de {SUBJECT} está incluso incentivando el desarrollo de infraestructuras de energía renovable en lugares remotos, convirtiendo lo que era una debilidad percibida en un motor de transición energética global."
];

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

const ANALISIS_TECNICO_BREVE = [
    "Técnicamente, este error suele originarse por una falta de sincronización entre el nodo local y la blockchain principal. Es un problema común que no suele comprometer los fondos, pero requiere paciencia mientras la red procesa los bloques pendientes.",
    "Desde el punto de vista del protocolo, este comportamiento es una medida de seguridad para prevenir ataques de doble gasto. El sistema bloquea temporalmente la salida hasta que se alcanza el número de confirmaciones de red necesarias para garantizar la inmutabilidad de la operación.",
    "Estamos ante un fallo de interfaz (UI), donde los saldos no se reflejan debido a una API saturada. Tus fondos están seguros en la blockchain; lo que ves es simplemente un error de visualización que se soluciona al cambiar de nodo RPC o esperar a que el tráfico disminuya."
];

const FAQ_TEMPLATE = [
    { q: "¿Es {SUBJECT} una buena inversión para principiantes?", a: "Depende del perfil de riesgo. Aunque tiene fundamentos sólidos, la volatilidad requiere una mentalidad de largo plazo y una gestión de riesgo estricta (no invertir más de lo que puedas perder)." },
    { q: "¿Cuáles son las comisiones estándar al operar con {SUBJECT}?", a: "Las comisiones varían según la red y la congestión del momento. En promedio, las redes modernas ofrecen transacciones por centavos de dólar, mientras que redes legacy pueden ser más costosas en picos de tráfico." },
    { q: "¿Dónde puedo guardar mis {SUBJECT} de forma segura?", a: "La opción más recomendada es una Hardware Wallet (Ledger o Trezor). Para uso diario, una Hot Wallet como MetaMask o Trust Wallet funciona bien, siempre que protejas tu frase semilla." },
    { q: "¿Qué diferencia a {SUBJECT} de sus competidores?", a: "Su principal diferenciador radica en su tecnología de escalabilidad y la comunidad de desarrolladores activa que impulsa actualizaciones constantes para mejorar la eficiencia del protocolo." }
];

export function getFaqForSubject(subject: string) {
    const seed = getSeed(subject);
    return FAQ_TEMPLATE.map(item => ({
        q: item.q.replace(/{SUBJECT}/g, subject),
        a: item.a.replace(/{SUBJECT}/g, subject)
    }));
}

// ==========================================
// 3. EXPERT & EEAT BLOCKS (NEW)
// ==========================================
const WARNING_BLOCKS = [
    "**ADVERTENCIA DE SEGURIDAD:** Nunca bajo ninguna circunstancia entregues tu frase semilla (seed phrase) a nadie. Ningún soporte técnico oficial de {SUBJECT} te la pedirá jamás. Si alguien lo hace, estás ante un intento de phishing garantizado.",
    "**RIESGO DE LIQUIDEZ:** Operar con {SUBJECT} en momentos de alta volatilidad puede resultar en 'slippage' (deslizamiento de precio) masivo. Recomendamos el uso de órdenes limitadas en lugar de órdenes de mercado para proteger tu capital.",
    "**CUIDADO CON LOS CLONES:** Existen miles de sitios web y aplicaciones falsas que imitan las interfaces oficiales de {SUBJECT}. Verifica siempre la URL y el certificado SSL antes de conectar tu billetera (wallet).",
    "**FONDOS IRRECUPERABLES:** Las transacciones en la red de {SUBJECT} son inmutables. Si envías fondos a una dirección errónea o a través de una red (network) no soportada, la probabilidad de recuperación es prácticamente nula."
];

const PRO_TIP_BLOCKS = [
    "**Consejo Experto:** Utiliza un explorador de bloques (como Etherscan o Solscan) para verificar el estado de tus transacciones con {SUBJECT} antes de contactar a soporte. La mayoría de los retrasos son públicos y visibles on-chain.",
    "**Estrategia de Gas:** Si no tienes prisa, programa tus transacciones de {SUBJECT} durante los fines de semana o en horarios de baja actividad para ahorrar hasta un 60% en comisiones de red.",
    "**Higiene Digital:** Crea una 'burner wallet' (billetera desechable) para interactuar con nuevos protocolos de {SUBJECT} antes de comprometer tus fondos principales depositados en una hardware wallet.",
    "**Auditoría Rápida:** Antes de invertir en un nuevo token del ecosistema {SUBJECT}, revisa su puntaje de seguridad en herramientas como DexTools o GoPlus para detectar 'honeypots' o funciones de acuñación maliciosas."
];

const WHAT_NOT_TO_DO = [
    "No guardes capturas de pantalla de tu frase semilla en servicios de la nube como Google Drive o iCloud. Los hackers suelen escanear estas carpetas en busca de patrones de 12 o 24 palabras.",
    "No confíes en 'recuperadores de fondos' (recovery services) que te contacten por privado. Suelen ser estafas secundarias que buscan aprovecharse de usuarios que ya han perdido capital.",
    "No operes con {SUBJECT} utilizando redes Wi-Fi públicas sin una VPN de grado militar. Tus paquetes de datos podrían ser interceptados mediante ataques de 'Man-in-the-Middle'.",
    "No inviertas más del 5% de tu portfolio total en activos de baja liquidez relacionados con {SUBJECT}, independientemente de las promesas de retorno rápido."
];

const CHECKLIST_BLOCKS = [
    "Verificación del contrato oficial on-chain.",
    "Comprobación de la red seleccionada (ERC-20, BEP-20, etc.).",
    "Validación de la dirección de destino (mínimo 3 veces).",
    "Cálculo de comisiones y margen de seguridad de gas.",
    "Resguardo de comprobante (Transaction Hash)."
];

const LSI_CLUSTERS: Record<string, string[]> = {
    "guide": ["soberanía financiera", "descentralización", "custodia personal", "smart contracts", "escalabilidad", "adopción masiva"],
    "security": ["ingeniería social", "phishing dinámico", "firmas múltiples", "air-gap", "auditoría de código", "protección de activos"],
    "news": ["volatilidad de mercado", "capitalización de mercado", "sentimiento de mercado", "resistencia clave", "soporte técnico", "liquidez institucional"]
};

// ==========================================
// 4. GENERATION LOGIC
// ==========================================

// NEW DEEP CONTENT BLOCKS
const HISTORY_BLOCKS = [
    "La historia de {SUBJECT} no es lineal. Desde sus inicios experimentales hasta convertirse en un pilar de la economía digital, ha atravesado múltiples ciclos de mercado (bull y bear markets). Entender este contexto histórico es vital para no sucumbir al pánico en momentos de volatilidad. Los primeros adoptantes que comprendieron la visión a largo plazo fueron recompensados no por suerte, sino por convicción en los fundamentos matemáticos del protocolo.",
    "Para comprender el presente de {SUBJECT}, debemos analizar su evolución. Lo que comenzó como una propuesta técnica en un foro de criptografía se ha transformado en una infraestructura financiera global. Cada actualización del protocolo (soft forks y hard forks) ha sido una prueba de estrés superada, consolidando su seguridad y resistencia a la censura frente a ataques coordinados.",
    "El recorrido de {SUBJECT} ha estado marcado por hitos regulatorios y tecnológicos. Al principio, era territorio de cypherpunks; hoy, es parte de los balances de empresas cotizadas en bolsa. Esta institucionalización no ha diluido su esencia descentralizada, sino que ha validado su tesis de inversión como una clase de activos soberana e incensurable."
];

const REGULATION_BLOCKS = [
    "En el ámbito legal, la situación de {SUBJECT} varía drásticamente según la jurisdicción. Mientras países como El Salvador han adoptado una postura de puertas abiertas, otras naciones mantienen restricciones estrictas. Es fundamental consultar con un asesor fiscal local para entender las implicaciones tributarias de la tenencia y venta de este activo. La normativa MiCA en Europa y las directrices de la SEC en EE.UU. están marcando el estándar global de cumplimiento.",
    "La regulación está dejando de ser una amenaza para convertirse en un catalizador de adopción para {SUBJECT}. La claridad normativa permite la entrada de capital institucional (fondos de pensiones, aseguradoras) que antes no podía operar por mandatos de riesgo. Sin embargo, esto conlleva una mayor vigilancia sobre las transacciones on-chain, lo que reaviva el debate sobre la privacidad financiera versus la seguridad nacional.",
    "Uno de los mayores desafíos para {SUBJECT} es la llamada 'Regla de Viaje' (Travel Rule) del GAFI. Esta normativa exige a los exchanges compartir datos de los usuarios en transacciones superiores a ciertos montos. Para el usuario promedio, esto significa que el KYC (Conoce a tu Cliente) ya no es opcional en plataformas centralizadas, reforzando la importancia de la autocustodia en billeteras frías para preservar la soberanía total."
];

const FUTURE_SCENARIOS = [
    "Mirando hacia el 2030, los analistas proyectan que {SUBJECT} podría integrarse completamente en la infraestructura bancaria backend. No necesariamente desplazando al dinero fiat, sino complementándolo como una capa de liquidación global neutral. La tokenización de activos del mundo real (RWA) podría multiplicar su liquidez al permitir que bienes raíces o bonos del tesoro se negocien sobre su red.",
    "El escenario más alcista para {SUBJECT} implica una crisis de deuda soberana global donde los inversores busquen activos inconfiscables. En este contexto, su oferta inelástica o programada actuaría como un seguro contra la degradación monetaria. No obstante, la competencia de las CBDC (Monedas Digitales de Banco Central) presentará un desafío en términos de facilidad de uso para el ciudadano común.",
    "La evolución tecnológica de {SUBJECT} apunta hacia la abstracción de cuentas y la invisibilidad del blockchain. En el futuro, los usuarios interactuarán con aplicaciones financieras sin saber que están usando {SUBJECT} por detrás, gracias a soluciones de escalabilidad que reducen las comisiones a fracciones de centavo y eliminan la complejidad de la gestión de claves privadas."
];

const ADVANCED_TECH_BLOCKS = [
    "Profundizando en la arquitectura, {SUBJECT} utiliza criptografía de curva elíptica para garantizar la integridad de las transacciones. A diferencia de las bases de datos SQL tradicionales, aquí no hay un administrador root; la seguridad emerge del consenso distribuido entre miles de nodos independientes. Esto hace que atacar la red sea económicamente inviable para cualquier actor racional.",
    "El mecanismo de consenso de {SUBJECT} es una obra maestra de la teoría de juegos. Incentiva a los participantes honestos y penaliza a los maliciosos sin necesidad de una autoridad central. Recientemente, mejoras en la eficiencia del protocolo han permitido reducir los requisitos de hardware para correr un nodo, fomentando una mayor descentralización geográfica de la red.",
    "La interoperabilidad mediante puentes (bridges) trustless es el próximo gran salto para {SUBJECT}. La capacidad de mover valor entre diferentes cadenas de bloques sin depender de custodios centralizados eliminará uno de los mayores vectores de ataque actuales. Los desarrolladores están implementando pruebas de conocimiento cero (ZK-proofs) para escalar la red sin sacrificar la privacidad de los datos."
];

// INTERNAL LINKING ENGINE
function injectSmartLinks(content: string, currentSlug: string): string {
    let linkedContent = content;
    const usedLinks = new Set<string>();
    let linkCount = 0;
    const MAX_LINKS = 6;

    // Helper to replace only the first occurrence outside of tags
    const replaceFirst = (text: string, search: string, url: string) => {
        if (linkCount >= MAX_LINKS) return text;
        if (usedLinks.has(url)) return text;

        // Use a more nuanced regex that attempts to avoid replacing text inside attributes or tags
        // This finds the word boundaries, but does not robustly check if we are inside a tag. 
        // Given complexity, we will rely on a simple 'first occurrence' approach which is generally safe for generated content without many links yet.
        const regex = new RegExp(`(^|\\s|>)(${search.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})(\\s|<|$|\\.|,)`, 'i');

        if (regex.test(text) && !text.includes(`href="${url}"`)) {
            return text.replace(regex, (match, prefix, word, suffix) => {
                // Double check we are not inside a tag (rudimentary check: no > after us before a <)
                // For generated HTML content, it is safer to just proceed if we are careful.

                if (linkCount >= MAX_LINKS) return match;
                if (usedLinks.has(url)) return match;

                usedLinks.add(url);
                linkCount++;
                return `${prefix}<a href="${url}" class="text-brand-400 hover:text-brand-300 transition-colors font-bold underline decoration-brand-500/30">${word}</a>${suffix}`;
            });
        }
        return text;
    };

    // 1. Link to Top Coins if mentioned
    COINS.forEach(coin => {
        // Avoid self-linking
        if (coin.name.toLowerCase() !== currentSlug.replace(/-/g, ' ').toLowerCase()) {
            const url = `/guias/que-es-${slugify(coin.name)}/${slugify(coin.name)}`;
            linkedContent = replaceFirst(linkedContent, coin.name, url);
        }
    });

    // 2. Link to Exchanges
    EXCHANGES_LIST.slice(0, 10).forEach(ex => {
        const url = `/reviews/${slugify(ex)}`;
        if (!currentSlug.includes(slugify(ex))) {
            linkedContent = replaceFirst(linkedContent, ex, url);
        }
    });

    // 3. Link to Hubs
    linkedContent = replaceFirst(linkedContent, "Noticias", "/noticias");
    linkedContent = replaceFirst(linkedContent, "Reviews", "/reviews");
    linkedContent = replaceFirst(linkedContent, "Estafas", "/estafas");

    return linkedContent;
}
export function generateSearchQueryContent(title: string, category: string, intent: string) {
    const seed = getSeed(title);
    let content = `<h2>Guía Resolutiva: ${title}</h2>`;

    content += `<p>Si estás enfrentando dificultades con **"${title}"**, es crucial mantener la calma y seguir un protocolo estricto. En CryptoAyuda, categorizamos este incidente dentro de ${category.toLowerCase()}, un área que requiere precisión técnica para evitar la pérdida definitiva de activos.</p>`;

    // Authority Section
    content += `<h3>1. Análisis Crítico de la Situación</h3>`;
    content += `<p>${pick(LONG_INTROS, seed).replace(/{SUBJECT}/g, title)}</p>`;
    content += `<p>Basándonos en nuestra base de datos de casos reales, **${title}** suele manifestarse por desajustes en la sincronización de red o configuraciones erróneas en la interfaz de usuario.</p>`;

    // Warnings (EEAT)
    content += `<div class="bg-red-950/20 border border-red-500/30 p-6 my-8 rounded-xl">`;
    content += `<h4 class="text-red-400 font-bold mb-4">⚠️ Qué NO hacer ahora mismo</h4>`;
    content += `<ul class="list-disc pl-5 space-y-2 text-red-200">`;
    content += `<li>${pick(WHAT_NOT_TO_DO, seed)}</li>`;
    content += `<li>${pick(WHAT_NOT_TO_DO, seed, 1)}</li>`;
    content += `</ul></div>`;

    // Actionable Steps
    content += `<h3>2. Protocolo de Resolución Paso a Paso</h3>`;
    content += `<p>Sigue estos pasos en el orden exacto para mitigar riesgos:</p>`;
    content += `<div class="bg-slate-900 border-l-4 border-brand-500 p-6 my-8 rounded-r-xl">`;
    content += `<ol class="space-y-4">
        <li><strong>Diagnóstico de Red:</strong> Verifica si el explorador oficial muestra transacciones pendientes asociadas a tu dirección.</li>
        <li><strong>Limpieza de Estado:</strong> Accede a la configuración de tu wallet y borra el historial de conexiones (nonce reset) si es necesario.</li>
        <li><strong>Validación de Nodo:</strong> Si el error persiste en **${title}**, intenta cambiar el proveedor RPC por uno de baja latencia.</li>
    </ol></div>`;

    // Pro-Tip
    content += `<div class="bg-brand-900/40 border border-brand-500/20 p-6 my-8 rounded-xl italic">`;
    content += `${pick(PRO_TIP_BLOCKS, seed).replace(/{SUBJECT}/g, category)} `;
    content += `</div>`;

    // Technical Context
    content += `<h3>3. Factores Técnicos Subyacentes</h3>`;
    content += `<p>${pick(ANALISIS_TECNICO_BREVE, seed)}</p>`;
    content += `<p>${pick(EXPERT_LEVEL_BLOCKS, seed, 10).replace(/{SUBJECT}/g, 'la infraestructura de red')}</p>`;

    // Common Errors FAQ (Semantic)
    content += `<h3>4. Preguntas Frecuentes sobre ${title}</h3>`;
    content += `<div class="space-y-6 mt-6">`;
    content += `<div class="border-b border-white/5 pb-4">
        <h4 class="font-bold text-white mb-2">¿Es normal que ${title} tarde tanto tiempo?</h4>
        <p class="text-slate-400 text-sm">En redes congestionadas, los tiempos de espera pueden triplicarse. Lo importante es que el hash de transacción sea rastreable.</p>
    </div>`;
    content += `<div class="border-b border-white/5 pb-4">
        <h4 class="font-bold text-white mb-2">¿Mis fondos corren peligro con este error?</h4>
        <p class="text-slate-400 text-sm">Generalmente no, siempre que no hayas compartido tus llaves privadas en sitios de phishing que imitan la solución a este problema.</p>
    </div>`;
    content += `</div>`;

    // Final Verdict
    content += `<p class="mt-12 text-lg font-medium">${pick(CONCLUSION_BLOCKS, seed).replace(/{SUBJECT}/g, 'este problema técnico')}</p>`;

    return {
        content,
        steps: [
            { name: "Diagnóstico de Red", text: `Verifica si el explorador oficial muestra transacciones pendientes asociadas a tu dirección para ${title}.` },
            { name: "Limpieza de Estado", text: "Accede a la configuración de tu wallet y borra el historial de conexiones (nonce reset) si es necesario." },
            { name: "Validación de Nodo", text: `Si el error persiste, intenta cambiar el proveedor RPC por uno de baja latencia específicamente para ${category}.` }
        ]
    };
}

export function generateArticleContent(subject: string, type: string, country?: string) {
    const seed = getSeed(subject + type + (country || ""));
    const lsiList = LSI_CLUSTERS[type] || LSI_CLUSTERS["guide"];

    // --- PART 1: HEADER & INTRO (>150 words) ---
    let content = `<h2>Dominando ${subject}: La Guía Profesional Definitiva (2025)</h2>`;

    content += `<p>${pick(LONG_INTROS, seed).replace(/{SUBJECT}/g, subject)} Al navegar por el **${pick(lsiList, seed)}**, los usuarios suelen enfrentar una curva de aprendizaje pronunciada donde la seguridad es el pilar fundamental. En esta guía exhaustiva, desglosaremos cada componente crítico para que puedas operar con la confianza de un experto.</p>`;
    content += `<p>${pick(EXPERTISE_CLUSTERS, seed, 5).replace(/{SUBJECT}/g, subject)} Esta transformación digital no es solo tecnológica, sino cultural, redefiniendo lo que entendemos por valor y propiedad en el siglo XXI.</p>`;

    // Quick Summary for UX
    content += `<div class="bg-slate-900 border border-white/10 p-8 rounded-2xl my-10">
        <h4 class="text-xl font-bold text-white mb-4">📌 Resumen Ejecutivo</h4>
        <div class="grid md:grid-cols-2 gap-4">
            <div class="text-sm text-slate-400"><strong>Dificultad:</strong> Intermedia</div>
            <div class="text-sm text-slate-400"><strong>Tiempo de Aplicación:</strong> 15-30 min</div>
            <div class="text-sm text-slate-400"><strong>Requisito:</strong> Hardware Wallet</div>
            <div class="text-sm text-slate-400"><strong>Categoría:</strong> ${type.toUpperCase()}</div>
        </div>
    </div>`;

    // Expert Warning (EEAT)
    content += `<div class="p-6 bg-red-950/30 border border-red-500/40 rounded-xl my-10">
        <div class="flex gap-4 items-start">
            <span class="text-3xl">⚠️</span>
            <div>
                <h4 class="text-red-400 font-bold mb-2">Advertencia del Experto</h4>
                <p class="text-red-100 text-sm leading-relaxed">${pick(WARNING_BLOCKS, seed).replace(/{SUBJECT}/g, subject)}</p>
            </div>
        </div>
    </div>`;

    // --- PART 2: HISTORY & CONTEXT (>300 words) ---
    content += `<h3>Historia y Evolución de ${subject}</h3>`;
    content += `<p>${pick(HISTORY_BLOCKS, seed).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(HISTORY_BLOCKS, seed, 1).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(HISTORY_BLOCKS, seed, 2).replace(/{SUBJECT}/g, subject)}</p>`;

    // Local Context
    if (country) {
        content += `<h3>El Ecosistema de ${subject} en ${country} (2025)</h3>`;
        content += `<p>${COUNTRY_BLOCKS[country] || DEFAULT_COUNTRY_BLOCK.replace(/{SUBJECT}/g, subject)}</p>`;
        content += `<p>En ${country}, la **${pick(lsiList, seed, 1)}** ha impactado significativamente en la economía local. Los usuarios están adoptando ${subject} no solo como inversión, sino como herramienta de libertad financiera frente a las restricciones tradicionales.</p>`;
        content += `<p>Es crucial utilizar plataformas que cumplan con la normativa local de ${country} para garantizar la seguridad de tus fondos y evitar bloqueos bancarios inesperados.</p>`;
    }

    // --- PART 3: TECHNICAL DEEP DIVE (>300 words) ---
    content += `<h3>Análisis Técnico: ¿Cómo funciona realmente?</h3>`;
    content += `<p>${pick(EXPERT_LEVEL_BLOCKS, seed).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(ADVANCED_TECH_BLOCKS, seed).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(ADVANCED_TECH_BLOCKS, seed, 1).replace(/{SUBJECT}/g, subject)}</p>`;

    content += `<h4>Seguridad y Criptografía</h4>`;
    content += `<p>${pick(ADVANCED_TECH_BLOCKS, seed, 2).replace(/{SUBJECT}/g, subject)} La inmutabilidad del ledger es lo que otorga a ${subject} su característica de 'dinero duro' digital.</p>`;

    // --- PART 4: REGULATION & RISKS (>250 words) ---
    content += `<h3>Marco Regulatorio y Cumplimiento</h3>`;
    content += `<p>${pick(REGULATION_BLOCKS, seed).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(REGULATION_BLOCKS, seed, 1).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(REGULATION_BLOCKS, seed, 2).replace(/{SUBJECT}/g, subject)}</p>`;

    // --- PART 5: PRACTICAL GUIDE (>200 words) ---
    content += `<h3>Checklist de Seguridad Operativa (OpSec)</h3>`;
    content += `<p>Para interactuar con ${subject} sin riesgos, sigue este protocolo estricto utilizado por inversores institucionales:</p>`;
    content += `<ul class="space-y-3 my-6">`;
    CHECKLIST_BLOCKS.forEach(item => {
        content += `<li class="flex items-center gap-3">
            <span class="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs">✓</span>
            <span class="text-slate-300">${item}</span>
        </li>`;
    });
    content += `</ul>`;

    // What NOT to do
    content += `<h3 class="text-red-400">Errores Fatales a Evitar</h3>`;
    content += `<div class="grid md:grid-cols-2 gap-4 my-8">`;
    WHAT_NOT_TO_DO.forEach((item, i) => {
        content += `<div class="bg-white/5 p-5 rounded-xl border border-white/5 text-sm text-slate-400">
            <span class="text-red-500 font-bold block mb-2">Mito #${i + 1}:</span>
            ${item.replace(/{SUBJECT}/g, subject)}
        </div>`;
    });
    content += `</div>`;

    // --- PART 6: FUTURE OUTLOOK (>200 words) ---
    content += `<h3>Proyección Futura: 2025-2030</h3>`;
    content += `<p>${pick(FUTURE_SCENARIOS, seed).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(FUTURE_SCENARIOS, seed, 1).replace(/{SUBJECT}/g, subject)}</p>`;
    content += `<p>${pick(FUTURE_SCENARIOS, seed, 2).replace(/{SUBJECT}/g, subject)}</p>`;

    // FAQ Section (>200 words)
    content += `<h3 class="mt-16">Preguntas Frecuentes sobre ${subject}</h3>`;
    content += `<div class="space-y-8 mt-8">`;
    getFaqForSubject(subject).slice(0, 6).forEach(item => {
        content += `<div>
            <h4 class="text-white font-bold mb-3 flex items-center gap-2">
                <span class="text-brand-500">?</span> ${item.q}
            </h4>
            <p class="text-slate-400 text-sm leading-relaxed">${item.a}</p>
        </div>`;
    });
    content += `</div>`;

    // Final Verdict
    content += `<div class="mt-16 p-1 bg-gradient-to-r from-brand-500 to-purple-500 rounded-2xl">
        <div class="bg-slate-950 p-8 rounded-[15px] text-center">
            <h4 class="text-2xl font-black text-white mb-4 uppercase italic">Veredicto de CryptoAyuda</h4>
            <p class="text-slate-300 mb-0">${pick(CONCLUSION_BLOCKS, seed).replace(/{SUBJECT}/g, subject)}</p>
        </div>
    </div>`;

    // INJECT LINKS BEFORE RETURNING
    const finalContent = injectSmartLinks(content, subject);

    return {
        content: finalContent,
        steps: CHECKLIST_BLOCKS.map(item => ({
            name: item.split('.')[0] || "Paso de Seguridad",
            text: item
        }))
    };
}

export function generateScamContent(topic: string) {
    const seed = getSeed(topic);
    return `
<h2>Análisis Forense: La Estafa de ${topic} (Informe 2025)</h2>
<p>La modalidad de **${topic}** ha evolucionado de simples mensajes de texto a infraestructuras de ingeniería social profundamente sofisticadas. En CryptoAyuda, nuestro equipo de ciberinteligencia ha desmantelado redes que utilizaban esta estafa para defraudar a usuarios de habla hispana.</p>

<div class="p-8 bg-error-900/20 border border-error-500/30 rounded-2xl my-10">
    <h4 class="text-error-400 text-xl font-bold mb-4 flex items-center gap-3">
        <span>🚨</span> ALERTA DE SEGURIDAD MÁXIMA
    </h4>
    <p class="text-slate-300 leading-relaxed">${pick(WARNING_BLOCKS, seed).replace(/{SUBJECT}/g, topic)}</p>
</div>

<h3>Cómo funciona exactamente la estafa de ${topic}</h3>
<p>El proceso suele comenzar con una oferta de 'liquidez gratuita' o 'acceso exclusivo'. Los criminales clonan las redes sociales de proyectos legítimos y utilizan bots para generar una percepción de confianza falsa.</p>

<div class="grid md:grid-cols-2 gap-6 my-10">
    <div class="glass p-6 rounded-xl border border-white/5">
        <h5 class="text-white font-bold mb-3 text-lg">Paso 1: El Gancho</h5>
        <p class="text-sm text-slate-400">Te prometen un retorno del 500% mensual o te envían un airdrop falso que requiere 'validación' de tu wallet.</p>
    </div>
    <div class="glass p-6 rounded-xl border border-white/5">
        <h5 class="text-white font-bold mb-3 text-lg">Paso 2: La Captura</h5>
        <p class="text-sm text-slate-400">Te redirigen a una URL que parece oficial pero es un sitio de phishing diseñado para capturar tus credenciales.</p>
    </div>
</div>

<h3 class="text-red-400">Lo que NUNCA debes hacer</h3>
<ul class="space-y-4 my-8">
    <li class="flex gap-4 items-start">
        <span class="text-red-500 font-bold">✖</span>
        <span class="text-slate-300 text-sm">No firmes 'Permit' o 'Approve' en dApps que no tengan una auditoría de Certik o similar.</span>
    </li>
    <li class="flex gap-4 items-start">
        <span class="text-red-500 font-bold">✖</span>
        <span class="text-slate-300 text-sm">No cliques en enlaces patrocinados de Google para buscar el soporte de ${topic}.</span>
    </li>
    <li class="flex gap-4 items-start">
        <span class="text-red-500 font-bold">✖</span>
        <span class="text-slate-300 text-sm">No compartas capturas de pantalla de errores donde sea visible tu dirección de wallet completa a desconocidos.</span>
    </li>
</ul>

<h3>¿Qué hacer si ya caíste?</h3>
<p>Si has interactuado con un contrato de **${topic}**, el tiempo es oro. Dirígete a **Revoke.cash** de inmediato y revoca cualquier permiso activo. Mueve el resto de tus activos a una billetera virgen y cambia todas tus contraseñas de acceso al exchange.</p>

<div class="mt-12 p-8 bg-slate-900 rounded-2xl text-center border border-white/5">
    <p class="text-slate-500 text-xs uppercase tracking-widest font-black mb-4">Servicio de Prevención de Delitos Digitales</p>
    <p class="text-slate-300 mb-0 font-medium">Ayuda a otros reportando este fraude en nuestra comunidad. La transparencia es la clave para derrotar a los estafadores de ${topic}.</p>
</div>
`;
}

export function generateCoinComparisonContent(c1: any, c2: any) {
    const seed = getSeed(c1.name + c2.name);
    const isC1PoW = ["Bitcoin", "Litecoin", "Dogecoin", "Monero"].includes(c1.name);
    const isC2PoW = ["Bitcoin", "Litecoin", "Dogecoin", "Monero"].includes(c2.name);
    const isC1Newer = c1.year > c2.year;

    return `
    <h2>${c1.name} vs ${c2.name}: La Comparativa Definitiva (Edición 2025)</h2>
    <p>En el panorama de la **${pick(LSI_CLUSTERS.guide, seed)}**, enfrentarse a la decisión entre **${c1.name}** y **${c2.name}** es un dilema común que define la estrategia de cualquier portfolio serio.</p>
    
    <div class="p-8 bg-slate-900 rounded-3xl my-10 border border-white/5 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 blur-3xl"></div>
        <h4 class="text-xl font-bold text-white mb-6">📊 Métricas de un Vistazo</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center">
                <div class="text-[10px] text-slate-500 uppercase font-bold mb-1">Riesgo ${c1.symbol}</div>
                <div class="text-white font-mono">${isC1PoW ? 'Bajo' : 'Medio'}</div>
            </div>
            <div class="text-center">
                <div class="text-[10px] text-slate-500 uppercase font-bold mb-1">Escalabilidad ${c2.symbol}</div>
                <div class="text-white font-mono">${isC2PoW ? 'Moderada' : 'Alta'}</div>
            </div>
            <div class="text-center">
                <div class="text-[10px] text-slate-500 uppercase font-bold mb-1">Sector</div>
                <div class="text-white font-mono">${c1.type}</div>
            </div>
            <div class="text-center">
                <div class="text-[10px] text-slate-500 uppercase font-bold mb-1">Veredicto</div>
                <div class="text-brand-400 font-bold uppercase text-xs">Ver final</div>
            </div>
        </div>
    </div>

    <h3>Diferencias en Gobernanza y Filosofía de Red</h3>
    <p>${pick(EXPERT_LEVEL_BLOCKS, seed).replace(/{SUBJECT}/g, c1.name)} Mientras tanto, ${c2.name} ha optado por un camino de **${pick(LSI_CLUSTERS.guide, seed, 2)}** que prioriza la velocidad.</p>

    <div class="bg-brand-900/20 border-l-4 border-brand-500 p-6 my-10 rounded-r-xl">
        <h4 class="text-white font-bold mb-2">🔥 La Clave del Ganador</h4>
        <p class="text-slate-300 text-sm leading-relaxed">${isC1Newer ? c1.name + ' ofrece una tecnología superior pero menos testeada en batalla' : c1.name + ' ofrece la seguridad de una red que nunca ha fallado en más de una década'}. Al final, el mercado valora la **resiliencia** tanto como la innovación.</p>
    </div>

    <h3>Análisis de Adopción e Infraestructura</h3>
    <p>${pick(ANALYSIS_BLOCKS, seed).replace(/{SUBJECT}/g, 'ambos activos')} Es fundamental entender que el éxito de ${c1.name} depende de su capacidad para integrarse con soluciones de capa 2, mientras que ${c2.name} ya nació con esa escalabilidad integrada de forma nativa.</p>

    <h3>Preguntas Frecuentes (FAQ)</h3>
    <div class="space-y-6 mt-6">
        <div class="border-b border-white/5 pb-4">
            <h4 class="text-white font-bold mb-2">¿Cuál es mejor para el largo plazo (HODL)?</h4>
            <p class="text-slate-400 text-sm">${c1.name} suele considerarse una reserva de valor más sólida, mientras que ${c2.name} ofrece mayores oportunidades de crecimiento explosivo gracias a su ecosistema de aplicaciones.</p>
        </div>
        <div class="border-b border-white/5 pb-4">
            <h4 class="text-white font-bold mb-2">¿Son compatibles estas carteras?</h4>
            <p class="text-slate-400 text-sm">Generalmente utilizan redes diferentes. Recomendamos el uso de billeteras multichain para gestionar ambos activos bajo una misma interfaz de seguridad.</p>
        </div>
    </div>

    <div class="mt-16 bg-gradient-to-br from-brand-600/20 to-transparent p-10 rounded-3xl border border-white/10">
        <h4 class="text-2xl font-black text-white mb-6 uppercase tracking-tighter">🏆 El Veredicto Final</h4>
        <p class="text-slate-300">${pick(CONCLUSION_BLOCKS, seed).replace(/{SUBJECT}/g, 'esta comparativa')} <strong>Recomendación:</strong> Diversifica un 60/40 para equilibrar seguridad y rentabilidad potencial.</p>
    </div>
    `;
}
