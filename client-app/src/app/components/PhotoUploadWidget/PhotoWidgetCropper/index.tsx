import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface PhotoWidgetCropperProps {
  imagePreview: string;
  handleSetCropper: (cropper: Cropper) => void;
}

export default function PhotoWidgetCropper({
  imagePreview,
  handleSetCropper,
}: PhotoWidgetCropperProps) {
  return (
    <Cropper
      src={imagePreview}
      style={{
        height: 200,
        width: "100%",
      }}
      initialAspectRatio={1}
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={handleSetCropper}
    />
  );
}
