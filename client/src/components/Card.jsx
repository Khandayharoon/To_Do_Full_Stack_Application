import { FaRegFileAlt } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
function Card({ data, reference, color }) {
  console.log(data);
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.2 }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
      className=" relative w-64 h-80 flex-shrink-0 bg-zinc-900/90 rounded-[45px] px-8 py-10 text-white  overflow-hidden"
    >
      <FaRegFileAlt />
      {/* <p>Title:</p> */}
      <p className="text-lg mt-5 leading-tight ">Title: {data.title}</p>
      <p className="text-lg mt-5 leading-tight ">
        Description: {data.description}
      </p>
      <div className="footer absolute bottom-0 w-full   left-0">
        <div className="flex items-center justify-between px-8 py-3 mb-3">
          <h5>0.{Math.floor(Math.random() * 10)}MB</h5>
          <span className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-600 cursor-pointer">
            {true ? <IoClose /> : <LuDownload size=".8em" color="#fff" />}
          </span>
        </div>
        {true && (
          <div
            className={`tag w-full py-4 flex items-center justify-center`}
            style={{ background: color }}
          >
            <h3 className="text-sm font-semibold">Download Now</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Card;

// import { FaRegFileAlt } from "react-icons/fa";
// import { LuDownload } from "react-icons/lu";
// import { IoClose } from "react-icons/io5";
// import { motion } from "framer-motion";
// function Card({ data, reference }) {
//   return (
//     <motion.div
//       drag
//       dragConstraints={reference}
//       whileDrag={{ scale: 1.2 }}
//       dragElastic={0.1}
//       dragTransition={{ bounceStiffness: 200, bounceDamping: 30 }}
//       className=" relative w-64 h-80 flex-shrink-0 bg-zinc-900/90 rounded-[45px] px-8 py-10 text-white  overflow-hidden"
//     >
//       <FaRegFileAlt />
//       {/* <p>Title:</p> */}
//       <p className="text-lg mt-5 leading-tight ">
//         Description: {data.description}
//       </p>
//       <div className="footer absolute bottom-0 w-full   left-0">
//         <div className="flex items-center justify-between px-8 py-3 mb-3">
//           <h5>{data.fileSize}</h5>
//           <span className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-600 cursor-pointer">
//             {data.close ? <IoClose /> : <LuDownload size=".8em" color="#fff" />}
//           </span>
//         </div>
//         {data.tag.isOpen && (
//           <div
//             className={`tag w-full py-4 ${
//               data.tag.tagColor === "blue" ? "bg-blue-600" : " bg-green-600"
//             } flex items-center justify-center`}
//           >
//             <h3 className="text-sm font-semibold">{data.tag.TagTitle}</h3>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// export default Card;
