let instance;

class MiscService {

  constructor() {

    // enforce singleton pattern
    if (!instance) { instance = this; }
    else           { return  instance; }

    this.preMuteVolume = 0.5; // initial value

  }
}

module.exports = MiscService;
