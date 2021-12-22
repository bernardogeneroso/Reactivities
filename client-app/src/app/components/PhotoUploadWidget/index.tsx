import { useCallback, useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";

import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface PhotoUploadWidgetProps {
  uploading: boolean;
  handlePhotoUpload: (file: Blob) => void;
}

export default function PhotoUploadWidget({
  uploading,
  handlePhotoUpload,
}: PhotoUploadWidgetProps) {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleSetFiles = useCallback((files: any) => {
    setFiles(files);
  }, []);

  const handleSetCropper = useCallback((cropper: any) => {
    setCropper(cropper);
  }, []);

  const onCrop = useCallback(() => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        handlePhotoUpload(blob!);
      });
    }
  }, [cropper, handlePhotoUpload]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 1 - Add Photo" />
        <PhotoWidgetDropzone {...{ handleSetFiles }} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 2 - Resize Image" />
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            {...{ handleSetCropper, imagePreview: files[0].preview }}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 3 - Preview & Upload" />

        {files && files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            />
            <Button.Group className="imgPreview">
              <Button
                loading={uploading}
                onClick={onCrop}
                positive
                icon="check"
              />
              <Button
                disabled={uploading}
                onClick={() => setFiles([])}
                icon="close"
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
