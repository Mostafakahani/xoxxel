import { Grid } from "@mui/material";
import StyleCreateProduct from "./StyleCreateProduct";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import axios from "axios";
import * as React from "react";
import { toast } from "react-toastify";

import GetToken from "GetToken";
const ConstData = { url: '' }
const Editor = () => {

  const editorRef = useRef(null);


  return (
    <>
      <Grid sx={StyleCreateProduct.Box}>
        <Grid sx={{ mt: "20px", mb: "20px" }}>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              selector: "textarea#open-source-plugins",
              skin: "oxide-dark",
              content_css: "dark",
              plugins:
                "preview importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
              editimage_cors_hosts: ["picsum.photos"],
              quickbars_insert_toolbar: "quicktable | blocks",
              menubar: "file edit view insert format tools table help",
              toolbar:
                "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media link anchor codesample | ltr rtl",
              toolbar_sticky: false,
              directionality: "rtl",
              importcss_append: true,
              images_upload_handler: (blobInfo, progress) =>
                new Promise((resolve, reject) => {
                  const formData = new FormData();
                  formData.append(
                    "media[]",
                    blobInfo.blob(),
                    blobInfo.filename()
                  );
                  axios
                    .post(
                      ConstData.url + "api/v1/client/multimedia",
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          Authorization: `Bearer ${GetToken("admin-token")}`,
                        },
                      }
                    )
                    .then((response) => {
                      resolve(response?.data?.data[0]?.file);
                    })
                    .catch((error) => {
                      reject("خطا، فایل بارگذاری نشد.");
                      toast.error("خطا، فایل بارگذاری نشد.", {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                        icon: "",
                      });
                    });
                }),
              height: 500,
              image_caption: true,
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
              noneditable_class: "mceNonEditable",
              toolbar_mode: "sliding",
              contextmenu: "link image table",
              content_style: "body { font-family:IRANSansX; font-size:12px }",
            }}
          />
        </Grid>
      </Grid>

    </>
  );
};
export default Editor;
