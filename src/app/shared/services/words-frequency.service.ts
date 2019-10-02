import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WordsFrequencyService {
  words = [];
  wordsWeight(wordData) {

      for (let i = 0; i < wordData.length; i++) {
          if (wordData[i] !== "undefined") {
          if ('abcdefghijklmnopqrstuvwxyzüöäß'.indexOf(wordData[i].toLowerCase()) !== -1) {
        this.words[wordData[i]] = ( typeof(this.words[wordData[i].value]) !== 'undefined' ) ? this.words[wordData[i].value] += 1 : 1;
    }}
            }
   var tmpList: any =  [];
   if (typeof wordData[0].value !== 'undefined') {

     for (let key in this.words) {
      tmpList.push({size: this.words[key], text: key});
        }

     this.sortieren(tmpList);
      return  tmpList.slice(0, 100);
   } else {
     var sortedString = wordData.toLowerCase().split('').sort();
     var chars = 'abcdefghijklmnopqrstuvwxyzüöäß';
     for (let i = 0; i < sortedString.length; i++) {
       if (chars.indexOf(sortedString[i]) !== -1) {
           this.words[sortedString[i]] = ( typeof this.words[sortedString[i]] !== 'undefined' ) ? this.words[sortedString[i]] += 1 : 1;
       }
    }
     for (let key in this.words) {
      tmpList.push({value: this.words[key], name: key});
        }
     this.sortiert(tmpList)

     return tmpList;
   }
  }
  sortiert (list){
    var chars = 'abcdefghijklmnopqrstuvwxyzüöäß';
    list.sort((a, b) => (chars.indexOf(a.name) > chars.indexOf(b.name)) ? 1 : -1);
  }
  sortieren(list){
      list.sort((a, b) => (a.size < b.size) ? 1 : -1);
  }


  play(data) {
      console.log("data recieved by Service 'WordsFrequencyService' ");
      return this.wordsWeight(data);
  }

}
