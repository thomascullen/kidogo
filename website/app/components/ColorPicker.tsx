interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({
  value,
  onChange,
}: ColorPickerProps): JSX.Element {
  return (
    <div className="color-picker">
      <div className="color-picker-dot" style={{ backgroundColor: value }} />
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
