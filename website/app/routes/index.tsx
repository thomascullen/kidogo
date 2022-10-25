import { motion } from "framer-motion";
import { createElement, useMemo, useState } from "react";
import StyleSelector from "~/components/styleSelector";
import solid from "kidogo/solid";
import outline from "kidogo/outline";
import duo from "kidogo/duo";
import duoline from "kidogo/duoline";
import duotone from "kidogo/duotone";
import CodeBlock from "~/components/CodeBlock";
import Header from "~/components/Header";
import ColorPicker from "~/components/ColorPicker";

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
        <div className="shrink-0 hidden md:block">
          <a href="https://github.com/thomascullen/kidogo" className="btn">
            Get Started
          </a>
        </div>
      </div>

      <div className="icon-grid-container">
        <div className="icon-grid">
          {Object.keys(icons).map((name, i) => {
            const component = icons[name];
            return (
              <div key={`${style}-${name}`} className="grid-cell">
                <motion.div
                  style={{ width: "100%", height: "100%" }}
                  className="grid place-items-center"
                  whileHover={{ scale: 1.5 }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.005 * i }}
                  >
                    {createElement(component, {
                      size: 24,
                      color,
                      secondaryColor,
                    })}
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <section className="flex flex-col lg:flex-row gap-12 lg:gap-20 py-12">
        <div className="sectionContent">
          <h2>React Components</h2>
          <p className="mb-8">
            Each icon is available as a stand alone react component with props
            for changing the colors and size.
          </p>
        </div>
        <div className="sectionGraphic">
          <CodeBlock color={color} secondaryColor={secondaryColor} />
        </div>
      </section>
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
    </div>
  );
}
