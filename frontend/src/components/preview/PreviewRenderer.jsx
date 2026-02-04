import AtsPreview from "./AtsPreview";
import ClassicPreivew from "./ClassicPreivew";
import MinimalPreview from "./MinimalPreview";
import ModernPreview from "./ModernPreview";
import SidebarPreview from "./SidebarPreview";

export default function PreviewRenderer({ cv }) {
    console.log("template selected: ",cv.template);

  switch (cv.template) {
    case "modern":
      return <ModernPreview cv={cv} />;
    case "classic":
      return <ClassicPreivew cv={cv} />;
    case "minimal":
      return <MinimalPreview cv={cv} />;
    case "sidebar":
      return <SidebarPreview cv={cv} />;
    case "ats": 
       return <AtsPreview cv={cv} />
    default:
      return <ModernPreview cv={cv} />;
  }
}
