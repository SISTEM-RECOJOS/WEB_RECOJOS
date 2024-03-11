import Image from "next/image";
import styles from "./page.module.css";
import { CFormInscription } from "@/app/Component/CInscription";

require('dotenv').config();

export default function Home() {
  return (
    <main className={styles.main}>
      <CFormInscription/>
    </main>
  );
}
