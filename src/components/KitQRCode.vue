<template>
<img :src="createCodeImage(publicId)" class="code-image" />
</template>

<script>
import bwipjs from "bwip-js";

export default {
  props: {
    publicId: {
      type: String,
      required: true
    }
  },
  methods: {
    createCodeImage(value) {
      let canvas = document.createElement("canvas");
      bwipjs.toCanvas(canvas, {
        bcid: "microqrcode", // Barcode type
        text: value, // Text to encode
        scale: 3, // 3x scaling factor
        height: 10, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center" // Always good to set this
      });
      return canvas.toDataURL("image/png");
    }
  }
};
</script>

<style></style>
