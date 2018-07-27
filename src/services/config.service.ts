import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';

@Injectable()
export class ConfigService {
    eventCloseGeolocPage  = new EventEmitter();

      constructor(public localStorage: Storage, private _appVersion: AppVersion) { 
           this.loadConfig();
      }

    
    eventConfigIsLoaded = new EventEmitter();
    platforms = [];
    config = {
        mapMarginBuffer: 50,
        lockMapHeading: true,
        followPosition: true,
        defaultPrimarykeyWindows: 'allTags',
        isDelayed: true
    };

    geolocPageIsOpen = true;
    geojsonIsLoadedFromCache = false;

    init = { lng : 2.6,
             lat: 47,
             zoom: 4.8 }

    appVersion = { appName: 'Osm Go!', appVersionCode: '12', appVersionNumber: '0.0.0' }



    loadConfig() {
        this.localStorage.get('config').then(d => {
            if (d) {
                for (let key in d) {
                    this.config[key] = d[key];
                }
            } else {
                this.localStorage.set('config', this.config);
            }
            this.eventConfigIsLoaded.emit(this.config);
        });
    }

    loadAppVersion() {

        this._appVersion.getAppName().then(e => {
            this.appVersion.appName = e;
        });
        this._appVersion.getVersionCode().then(e => {
            this.appVersion.appVersionCode = e;
        });
        this._appVersion.getVersionNumber().then(e => {
            this.appVersion.appVersionNumber = e;
        });


    }

    getAppVersion() {
        return this.appVersion;
    }


    setMapMarginBuffer(buffer: number) {
        this.config.mapMarginBuffer = buffer;
        this.localStorage.set('config', this.config);
    }
    getMapMarginBuffer() {
        return this.config.mapMarginBuffer;
    }

    setLockMapHeading(isLockMapHeading: boolean) {
        this.config.lockMapHeading = isLockMapHeading;
        this.localStorage.set('config', this.config);
    }
    getLockMapHeading() {
        return this.config.lockMapHeading;
    }


    setFollowPosition(isFollowingPosition: boolean) {
        this.config.followPosition = isFollowingPosition;
        this.localStorage.set('config', this.config);
    }
    getFollowPosition() {
        return this.config.followPosition;
    }

    setDefaultPrimarykeyWindows(defaultPrimarykeyWindows: string) {
        this.config.defaultPrimarykeyWindows = defaultPrimarykeyWindows;
        this.localStorage.set('config', this.config);
    }

    getDefaultPrimarykeyWindows() {
        return this.config.defaultPrimarykeyWindows;
    }


    setIsDelayed(isDelayed: boolean) {
        this.config.isDelayed = isDelayed;
        this.localStorage.set('config', this.config);
    }

    getIsDelayed() {
        return this.config.isDelayed;
    }



}