import React from 'react';

import {describe, it} from 'mocha';
import chai from 'chai';
import {shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

const {expect} = chai;

import Script from '../../src/common/elements/page/Script';

describe('<Script /> component', function() {
    it('should allow empty content', function() {
        const script = shallow(<Script></Script>);

        expect(script).to.be.present();
        expect(script).to.be.blank();
    });

    it('should allow non-empty content', function() {
        const script = shallow(<Script>const a = 100;</Script>);

        expect(script).to.be.present();
        expect(script).to.have.html('<script>const a = 100;</script>');
    });
});
