import React from "react";
import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiPostgresql,
  SiStripe,
  SiRedux,
  SiJavascript,
  SiHtml5,
  SiPython,
  SiVuedotjs,
  SiAngular,
  SiGraphql,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiMqtt,
  SiPhp,
  SiLaravel,
  SiCodeigniter,
  SiJquery,
  SiWordpress,
  SiElementor,
  SiBootstrap,
  SiFigma
} from "react-icons/si";
import { FaCode, FaAws, FaCss3Alt, FaCartShopping, FaMagnifyingGlass, FaFileCode } from "react-icons/fa6";

interface TechStackIconProps {
  name: string;
  className?: string;
}

export function TechStackIcon({ name, className = "w-4 h-4" }: TechStackIconProps) {
  const normalizedName = name.toLowerCase().replace(/\s+/g, '');

  switch (normalizedName) {
    case 'next.js':
    case 'nextjs':
      return <SiNextdotjs className={className} />;
    case 'react':
    case 'reactnative':
      return <SiReact className={className} />;
    case 'typescript':
      return <SiTypescript className={className} />;
    case 'javascript':
      return <SiJavascript className={className} />;
    case 'tailwindcss':
    case 'tailwind':
      return <SiTailwindcss className={className} />;
    case 'node.js':
    case 'nodejs':
      return <SiNodedotjs className={className} />;
    case 'postgresql':
    case 'postgres':
    case 'sql':
      return <SiPostgresql className={className} />;
    case 'stripe':
      return <SiStripe className={className} />;
    case 'redux':
      return <SiRedux className={className} />;
    case 'css':
    case 'css3':
      return <FaCss3Alt className={className} />;
    case 'html':
    case 'html5':
      return <SiHtml5 className={className} />;
    case 'python':
      return <SiPython className={className} />;
    case 'vue':
    case 'vue.js':
    case 'vuejs':
      return <SiVuedotjs className={className} />;
    case 'angular':
      return <SiAngular className={className} />;
    case 'graphql':
      return <SiGraphql className={className} />;
    case 'mongodb':
    case 'mongo':
      return <SiMongodb className={className} />;
    case 'redis':
      return <SiRedis className={className} />;
    case 'aws':
    case 'amazonwebservices':
      return <FaAws className={className} />;
    case 'firebase':
      return <SiFirebase className={className} />;
    case 'mqtt':
      return <SiMqtt className={className} />;
    case 'php':
      return <SiPhp className={className} />;
    case 'laravel':
      return <SiLaravel className={className} />;
    case 'codeigniter':
      return <SiCodeigniter className={className} />;
    case 'jquery':
      return <SiJquery className={className} />;
    case 'cs-cart':
    case 'cscart':
      return <FaCartShopping className={className} />;
    case 'smarty':
      return <FaFileCode className={className} />;
    case 'searchanise':
      return <FaMagnifyingGlass className={className} />;
    case 'wordpress':
      return <SiWordpress className={className} />;
    case 'elementor':
      return <SiElementor className={className} />;
    case 'bootstrap':
    case 'bootstrap5':
      return <SiBootstrap className={className} />;
    case 'figma':
      return <SiFigma className={className} />;
    default:
      return <FaCode className={className} />;
  }
}

