import { motion } from "framer-motion";

interface StyleChoiceProps {
  currentStyle: string;
  styleName: string;
  children: React.ReactNode;
  setStyle: (style: string) => void;
}

function StyleChoice({
  currentStyle,
  styleName,
  children,
  setStyle,
}: StyleChoiceProps): JSX.Element {
  return (
    <li
      onClick={() => setStyle(styleName)}
      data-active={currentStyle === styleName}
    >
      <span>{children}</span>
      {currentStyle === styleName && (
        <motion.div layoutId="currentStyle" className="current" />
      )}
    </li>
  );
}

interface StyleSelectorProps {
  currentStyle: string;
  setStyle: (style: string) => void;
}

export default function StyleSelector({
  setStyle,
  currentStyle,
}: StyleSelectorProps): JSX.Element {
  return (
    <div className="w-full">
      <select
        className="flex w-full md:hidden"
        value={currentStyle}
        onChange={(e) => setStyle(e.target.value)}
      >
        <option value="duo">Duo</option>
        <option value="duoline">Duoline</option>
        <option value="solid">Solid</option>
        <option value="outline">Outline</option>
        <option value="duotone">Duotone</option>
      </select>
      <ul className="styleSelector hidden md:inline-flex">
        <StyleChoice
          styleName="duo"
          setStyle={setStyle}
          currentStyle={currentStyle}
        >
          Duo
        </StyleChoice>
        <StyleChoice
          styleName="duoline"
          setStyle={setStyle}
          currentStyle={currentStyle}
        >
          Duoline
        </StyleChoice>
        <StyleChoice
          styleName="solid"
          setStyle={setStyle}
          currentStyle={currentStyle}
        >
          Solid
        </StyleChoice>
        <StyleChoice
          styleName="outline"
          setStyle={setStyle}
          currentStyle={currentStyle}
        >
          Outline
        </StyleChoice>
        <StyleChoice
          styleName="duotone"
          setStyle={setStyle}
          currentStyle={currentStyle}
        >
          Duotone
        </StyleChoice>
      </ul>
    </div>
  );
}
