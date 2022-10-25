interface CodeBlockProps {
  color: string;
  secondaryColor: string;
}

export default function CodeBlock({
  color,
  secondaryColor,
}: CodeBlockProps): JSX.Element {
  return (
    <div className="code">
      <div className="codeLineNumbers">
        1 <br />
        2 <br />
        3 <br />
        4 <br />
        5 <br />
        6 <br />
        7 <br />
        8 <br />
        9 <br />
        10 <br />
        11 <br />
        12 <br />
        13 <br />
        14 <br />
      </div>
      <div className="codeLines">
        <span className="pine">{`import `}</span>
        <span className="subtle">{`{`}</span>
        <span className="foam">{` Cart `}</span>
        <span className="subtle">{`}`}</span>
        <span className="pine">{` from `} </span>
        <span className="text">{`"./icons/duo"`} </span>
        <br />
        <br />
        <span className="pine">{`function `}</span>
        <span className="rose">PurchaseButton</span>
        <span className="subtle">{`() {`}</span>
        <br />
        <span className="pine">&emsp;return&nbsp;</span>
        <span className="subtle">{`(`}</span>
        <br />
        <span className="rose">&emsp;&emsp;{`<button>`}</span>
        <br />
        <span className="rose">&emsp;&emsp;&emsp;{`<Cart`}</span>
        <br />
        <span className="iris">&emsp;&emsp;&emsp;&emsp;size</span>
        <span className="subtle">{`=`}</span>
        <span className="text">{`{`}</span>
        <span className="foam">{`24`}</span>
        <span className="text">{`}`}</span>
        <br />
        <span className="iris">&emsp;&emsp;&emsp;&emsp;color</span>
        <span className="subtle">{`=`}</span>
        <span className="gold">{`"${color}"`}</span>
        <br />
        <span className="iris">&emsp;&emsp;&emsp;&emsp;secondaryColor</span>
        <span className="subtle">{`=`}</span>
        <span className="gold">{`"${secondaryColor}"`}</span>
        <br />
        <span className="rose">&emsp;&emsp;&emsp;{`/>`}</span>
        <br />
        <span className="text">&emsp;&emsp;&emsp;Purchase</span>
        <br />
        <span className="rose">&emsp;&emsp;{`</button>`}</span>
        <br />
        <span className="subtle">&emsp;{`)`}</span>
        <br />
        <span className="subtle">{`}`}</span>
      </div>
    </div>
  );
}
