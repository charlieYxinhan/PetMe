import MenuPoster from "./menu-poster";
import { CatMenuText, DogMenuText } from "./menu-text";

export default function MenuGallery({ heading = "h2" }: { heading?: "h2" | "h3" }) {
  return (
    <div className="menu-gallery">
      <MenuPoster id="dog" heading={heading}>
        <DogMenuText />
      </MenuPoster>
      <MenuPoster id="cat" heading={heading}>
        <CatMenuText />
      </MenuPoster>
    </div>
  );
}
