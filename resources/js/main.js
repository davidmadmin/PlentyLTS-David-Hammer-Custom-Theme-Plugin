import { initHeaderFH } from "./modules/header-fh";
import { initHeaderSH } from "./modules/header-sh";
import { onReady } from "./core/on-ready";

onReady(function () {
  initHeaderFH();
  initHeaderSH();
});
