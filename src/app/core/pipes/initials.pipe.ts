import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "Initials",
})
export class InitialsPipe implements PipeTransform {
  transform(name: string): string {
    let names = name.split(" ");
    names = names.filter(name => name);
    let initials: string;
    if (names.length > 1) {
      initials = `${names[0][0]}${names[1][0]}`.toUpperCase();
    } else {
      initials = `${names[0][0]}`.toUpperCase();
    }

    return initials;
  }
}
