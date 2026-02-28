import { useTranslation } from "react-i18next";

const Footer = () => {
  const color = "#06B6D4"; // Changed from #EF4444 (red) to cyan-500

  const { t } = useTranslation();

  return (
    <div className="relative mt-16 bg-deep-cyan-accent-400">
      {/* Animated Wave Divider */}
      <div className="absolute inset-x-0 -top-6">
        <svg
          viewBox="0 0 224 12"
          className="w-full h-12"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="animatedGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ffffff">
                <animate
                  attributeName="stop-color"
                  values="#ffffff;#a5f3fc;#ffffff" // Changed from #fecaca (light red) to #a5f3fc (light cyan)
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#a5f3fc"> {/* Changed from #fecaca to #a5f3fc */}
                <animate
                  attributeName="stop-color"
                  values="#a5f3fc;#06B6D4;#a5f3fc" // Changed from red gradient to cyan gradient
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#ffffff">
                <animate
                  attributeName="stop-color"
                  values="#ffffff;#a5f3fc;#ffffff" // Changed from #fecaca to #a5f3fc
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <path
            d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"
            fill="url(#animatedGradient)"
          />
        </svg>
      </div>

      <div className="flex justify-center items-center pt-12 gap-x-12">
        <a
          href="/"
          className="transition-colors duration-300 text-deep-cyan-100 hover:text-cyan-500"
        >
          <svg viewBox="0 0 30 30" fill={'#06B6D4'} className="h-6"> {/* Changed fill from black to cyan-500 */}
            <circle cx="15" cy="15" r="4" />
            <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
          </svg>
        </a>
        <a
          href="/"
          className="transition-colors duration-300 text-deep-cyan-100 hover:text-cyan-500"
        >
          <svg viewBox="0 0 24 24" fill={'#06B6D4'} className="h-5"> {/* Changed fill from black to cyan-500 */}
            <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
          </svg>
        </a>
      </div>

      <p className="text-xs text-center my-4 md:text-lg ">
        لين بوتيك
      </p>
    </div>
  );
};

export default Footer;