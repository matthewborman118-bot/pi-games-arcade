# Little Screen Studio

A static animation library and browser uploader for MSU2 Mini compatible 160 × 80 USB displays. Hosted alongside the Borman Family Arcade at `little-screen/`.

## Using it

1. Open the public website in desktop Chrome or Edge.
2. Pick a companion, or import a GIF, PNG, JPEG, WebP, or `.msupack` file.
3. Connect the screen and select it in the browser's USB/serial chooser.
4. Optionally use **Save current screen animation** to download a recovery pack.
5. Click **Load onto screen**. Keep the screen connected and the tab open while it writes and verifies every animation byte.
6. Once complete, the serial connection closes and the screen returns to standalone operation. USB power is enough to play it.

The page uses Web Serial on HTTPS or localhost. Browsing and pack downloads work without USB access. Imports and backups remain in the browser; there is no upload server, account system, telemetry, or third-party script. Imported packs last for the current page session, so download them to keep them.

## Adding animations to the public collection

1. Use **Make your own** to import a GIF or picture and download the resulting `.msupack` file.
2. Add the pack to this folder's `packs/` directory through GitHub. Add a PNG preview there too.
3. Add an entry to `catalog.json` with a unique `id`, a `name`, a short `description`, and relative `file` and `preview` paths. The existing entries are examples.
4. Commit the changes to the site's publishing branch. GitHub Pages will publish the updated collection.

The stock screen stores a 36-frame animation loop at 10 fps. GIFs are sampled evenly across their duration to fit all 36 frames; pictures repeat for all frames. Images are center-cropped to 2:1 and converted into 160 × 80 RGB565. A pack replaces the previous animation. The tool does not change microcontroller firmware, fonts, or the separate stored photo.

## Pack format

`.msupack` consists of ASCII `MSUPACK1`, a 4-byte big-endian JSON header length, UTF-8 JSON metadata, and exactly 921,600 bytes of big-endian RGB565 frame data. Metadata specifies format/version, name, dimensions, 36 frames, 10 fps, encoding, and a SHA-256 of the frame data. Parsing validates all dimensions, total length, and checksum before enabling upload.

## Local development

Run `python -m http.server 8770 --bind 127.0.0.1` in this directory and open `http://127.0.0.1:8770/`. No build step or package installation is needed. All links are relative, so the site also works under the arcade's repository subpath.

## Hardware and validation

USB VID `1A86`, PID `FE0C`; serial 19200 baud; MSN handshake. The uploader checks the screen's reported 160 × 80 dimensions, restricts erasing/writing to animation pages 0–3599, waits for acknowledgements, and compares all written bytes against read-back before declaring success. Connecting only identifies the device and does not write artwork. Every operation closes its serial port afterward.

The protocol and animation layout follow the [MSU2 reference implementation](https://github.com/Carteahere/MSU2-USB-Screen-Android) and the manufacturer guide. Native serial uploads were physically tested on the owner's screen. The JavaScript protocol engine is tested against a memory emulator, including full upload/read-back, rejection of corrupted packs, wrong screen dimensions, and preservation of non-animation storage. Browser tests cover imports, downloads, search, and desktop/mobile rendering. Direct Web Serial upload on physical hardware still needs a browser-level check; successful native serial tests do not replace that check.

The character artwork was generated for this project.
