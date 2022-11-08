import { motion } from "framer-motion";
import { createElement, useMemo, useState } from "react";
import StyleSelector from "~/components/styleSelector";
import solid from "kidogo/solid";
import outline from "kidogo/outline";
import duo from "kidogo/duo";
import duoline from "kidogo/duoline";
import duotone from "kidogo/duotone";
import Header from "~/components/Header";
import ColorPicker from "~/components/ColorPicker";
import FigmaLogo from "~/components/FigmaLogo";

const STYLES = {
  solid,
  outline,
  duo,
  duoline,
  duotone,
};

export default function Index() {
  const [color, setColor] = useState("#FFFFFF");
  const [secondaryColor, setSecondaryColor] = useState("#524f67");
  const [style, setStyle] = useState("duo");

  const icons = useMemo(() => {
    return STYLES[style];
  }, [style]);

  return (
    <>
      <div className="container">
        <Header />
        <h1 className="font-heading text-5xl md:text-[52px] font-[600] tracking-tight leading-none mb-4">
          Beautiful, hand crafted icons.
        </h1>
        <p className="text-gray-300 md:text-lg leading-loose mb-12">
          A growing collection of icons in 5 different styles designed for the
          web.
        </p>

        <div className="toolbar">
          <div className="flex w-full items-center gap-2">
            <ColorPicker value={color} onChange={setColor} />
            <ColorPicker value={secondaryColor} onChange={setSecondaryColor} />
            <StyleSelector currentStyle={style} setStyle={setStyle} />
          </div>
          <div className="shrink-0 hidden md:flex gap-4">
            <a
              href="https://www.figma.com/community/file/1171757667324008945"
              className="btn btn-outline"
            >
              <FigmaLogo />
              Figma
            </a>
            <a href="https://github.com/thomascullen/kidogo" className="btn">
              Get Started
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4 pt-10 pb-16 sm:pt-11 md:pt-12 px-5 lg:px-20">
        {Object.keys(icons).map((name, i) => {
          const component = icons[name];
          return (
            <div key={`${style}-${name}`} className="grid-cell">
              {createElement(component, {
                size: 24,
                color,
                secondaryColor,
              })}
              <span>{name}</span>
            </div>
          );
        })}
      </div>
      <footer className="text-center py-8">
        <span className="text-neutral-500">
          Created by{" "}
          <a
            className="text-neutral-200 hover:underline"
            href="https://thomascullen.io"
          >
            Thomas Cullen
          </a>
        </span>
      </footer>
    </>
  );
}
