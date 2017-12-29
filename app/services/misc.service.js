let instance;

class MiscService {

  constructor(tags) {

    // enforce singleton pattern
    if (!instance) { instance = this; }
    else           { return  instance; }

    this.preMuteVolume = 0.5; // initial value

  }
}

module.exports = MiscService;
