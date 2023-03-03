import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export class TestLoader {
  //---------------------------------------------

  static LoadFBX(url) {
      return new Promise( resolve => {
          new FBXLoader().load(url, resolve, undefined, function(err) { console.error('fail loading fbx:', url ) });
      });
  }

  static LoadCharacter() {
    const promises = [];
    promises.push(TestLoader.LoadFBX("char/mixamo_xbot.fbx"));
    promises.push(TestLoader.LoadFBX("char/@standing_greeting.fbx"));

    return Promise.all(promises).then(result => {
      return {o3d: result[0], ani: result[1]};
    });
  }
}
