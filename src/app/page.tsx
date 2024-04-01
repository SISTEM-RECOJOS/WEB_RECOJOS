import Image from "next/image";
import styles from "./css/page.module.css";
import { CFormInscription } from "@/app/Component/CInscription";


export default function Home() {
  return (
    <main className="main">
      <CFormInscription/>
    </main>
  );
}
