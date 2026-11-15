# Private documents

Place the approved PDF documents to be emailed to verified visitors in this folder.

- Only `.pdf` files are sent; all PDFs in this folder are attached to one email.
- Keep the combined size under about 28 MB (Resend's attachment limit is 40 MB after encoding).
- The folder sits outside `public/`, so these files are never reachable by URL.
- While the folder holds no PDF, the website shows "Documents are temporarily unavailable"
  and no verification code is sent.
- Set `DOCUMENTS_DIR` to use a different folder (for example, a mounted volume on the server).
