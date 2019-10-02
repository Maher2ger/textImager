export interface ProcessMultiRequestDto {

  files: {
    item: string[]
  };

  fileNames: {
    item: string[]
  };

  options: {
    item: string[]
  };

  /**
   *
   <files>
     <item>Das ist ein Test</item>
   </files>
   <fileNames>
      <item>Unnamed Text</item>
   </fileNames>
   <options>
      <item>de</item>
      <item>StanfordParser,Sentiws,MarMoTLemma,LanguageToolSegmenter</item>
   </options>
   */

}
