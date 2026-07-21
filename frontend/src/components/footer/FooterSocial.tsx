import Image from 'next/image';

export function FooterSocial() {
  return (
    <div>
      <h3 className="text-xs font-bold text-white tracking-widest mb-5">Síguenos</h3>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/glastor-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-50 hover:opacity-100 hover:scale-110 transition-all"
          >
            <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} className="w-5 h-5 invert" />
          </a>
          <a
            href="https://wa.me/5491132578591"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-50 hover:opacity-100 hover:text-brand hover:scale-110 transition-all"
          >
            <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="w-5 h-5" />
          </a>
          <a
            href="https://t.me/zerhocool"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-50 hover:opacity-100 hover:text-brand hover:scale-110 transition-all"
          >
            <Image src="/icons/telegram.svg" alt="Telegram" width={20} height={20} className="w-5 h-5 invert" />
          </a>
          <a
            href="https://instagram.com/glastorgroup"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="opacity-50 hover:opacity-100 hover:scale-110 transition-all"
          >
            <Image src="/icons/instagram.svg" alt="Instagram" width={20} height={20} className="w-5 h-5 invert" />
          </a>
          <a
            href="mailto:ventas@glastor.es"
            className="opacity-50 hover:opacity-100 hover:scale-110 transition-all"
          >
            <Image
              src="/icons/aws-res-amazon-simple-email-service-email.svg"
              alt="Email"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </a>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <a
            href="https://auth.afip.gob.ar/contribuyente_/login.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-14 w-10 opacity-60 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/images/DATAWEB.jpg"
              alt="Data fiscal"
              fill
              sizes="40px"
              className="object-contain rounded-sm grayscale hover:grayscale-0 transition-all duration-300"
            />
          </a>
          <Image
            src="https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_60/v1783566465/iso-27001_hzcz5n.webp"
            alt="ISO 27001 Certified"
            width={100}
            height={100}
            className="h-14 object-contain opacity-60 hover:opacity-100 transition-opacity rounded-sm grayscale hover:grayscale-0"
          />
        </div>
      </div>
    </div>
  );
}
