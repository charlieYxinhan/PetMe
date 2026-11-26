import { permanentRedirect } from "next/navigation";

export default function Photos() {
  permanentRedirect("/studio#gallery");
}
