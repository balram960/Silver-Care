export {};

declare global {
  interface Window {
    // Web Speech API — not in standard lib.dom typings yet.
    SpeechRecognition?: { new (): any };
    webkitSpeechRecognition?: { new (): any };
  }
}
