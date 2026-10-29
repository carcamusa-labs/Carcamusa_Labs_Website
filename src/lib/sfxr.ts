/* Vendored jsfxr (Unlicense) — https://github.com/chr15m/jsfxr */
// @ts-ignore vendored ESM has no TS types
import jsfxr, { sfxr as sfxrApi, Params as ParamsCtor } from "./jsfxr/sfxr.js";

export type SfxSynthDef = Record<string, number | boolean | undefined> & {
  oldParams?: boolean;
  wave_type: number;
  sound_vol: number;
  sample_rate: number;
  sample_size: number;
};

export type SfxrApi = {
  generate: (algorithm: string, options?: Record<string, number>) => SfxSynthDef;
  play: (synthdef: SfxSynthDef | string) => unknown;
  toAudio: (synthdef: SfxSynthDef | string) => { play: () => void };
  toWebAudio: (
    synthdef: SfxSynthDef | string,
    audiocontext: AudioContext,
  ) => AudioBufferSourceNode | undefined;
  toWave: (synthdef: SfxSynthDef | string) => {
    dataURI: string;
    buffer?: number[];
    header: { sampleRate: number; bitsPerSample: number };
  };
  toBuffer: (synthdef: SfxSynthDef | string) => number[];
  b58encode: (synthdef: SfxSynthDef) => string;
  b58decode: (b58: string) => SfxSynthDef;
};

export type ParamsInstance = SfxSynthDef & {
  fromJSON: (struct: SfxSynthDef) => ParamsInstance;
  mutate: () => ParamsInstance;
};

export type JsfxrModule = {
  sfxr: SfxrApi;
  Params: new () => ParamsInstance;
};

export const sfxr = sfxrApi as SfxrApi;
export default (jsfxr ?? { sfxr, Params: ParamsCtor }) as JsfxrModule;
