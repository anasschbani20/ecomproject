

// get photo pipe
import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../environments/environment";

@Pipe({
  name: 'getPhoto'
})
export class GetPhotoPipe implements PipeTransform {

    transform(value: any, args?: any): any {
      console.log('transform', value, args)
      if(this.isValidURL(value)){
        return value;
      }else{
        return environment.basePhotosUrl + value + '/0/0/0';
      }
      return '';
    }

   isValidURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

}
