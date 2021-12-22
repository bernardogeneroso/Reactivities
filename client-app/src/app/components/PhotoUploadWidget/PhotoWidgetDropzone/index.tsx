import { useCallback, CSSProperties } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";

interface PhotoWidgetDropzoneProps {
  handleSetFiles: (files: any) => void;
}

export default function PhotoWidgetDropzone({
  handleSetFiles,
}: PhotoWidgetDropzoneProps) {
  const dzStyles: CSSProperties = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "0.5rem",
    paddingTop: "3rem",
    textAlign: "center",
    height: 200,
  };

  const dzActive: CSSProperties = {
    borderColor: "green",
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      handleSetFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [handleSetFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? {
              ...dzStyles,
              ...dzActive,
            }
          : dzStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  );
}
