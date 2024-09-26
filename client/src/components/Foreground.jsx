import { useRef } from "react";
import Card from "./card";

function Foreground() {
  const ref = useRef(null);

  const data = [
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing Hk elit",
      fileSize: "0.9 Mb",
      close: true,
      tag: { isOpen: true, TagTitle: "Download Now", tagColor: "green" },
    },
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing Hk elit",
      fileSize: "0.9 Mb",
      close: true,
      tag: { isOpen: true, TagTitle: "Download Now", tagColor: "blue" },
    },
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing Hk elit",
      fileSize: "0.9 Mb",
      close: true,
      tag: { isOpen: true, TagTitle: "Download Now", tagColor: "green" },
    },
  ];
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full h-full z-[4] flex gap-10 flex-wrap p-5"
    >
      {/* <Card /> */}
      {data.map((item, index) => (
        <Card data={item} reference={ref} />
      ))}
    </div>
  );
}

export default Foreground;
