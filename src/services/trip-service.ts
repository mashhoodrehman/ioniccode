import {Injectable} from "@angular/core";
import {TRIPS} from "./mock-trips";
import { CommonserviceProvider } from "../providers/commonservice/commonservice";

@Injectable()
export class TripService {
  private trips: any;
  public result: any;

  constructor(public provider: CommonserviceProvider) {
    this.trips = TRIPS;
  }

  getAll() {
    return 'ok';
  }

  getItem(id) {
    for (var i = 0; i < this.trips.length; i++) {
      if (this.trips[i].id === parseInt(id)) {
        return this.trips[i];
      }
    }
    return null;
  }

  remove(item) {
    this.trips.splice(this.trips.indexOf(item), 1);
  }
}
