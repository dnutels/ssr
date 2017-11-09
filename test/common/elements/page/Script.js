import React from 'react';

import {describe, it} from 'mocha';
import chai from 'chai';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

const {expect} = chai;

import Script from '../../../../lib/elements/page/Script';

describe('<Script> component', function() {
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

    it('should support any optional attribute', function() {
        const script = shallow(<Script a="100" b={true} />);

        expect(script).to.be.present();
        expect(script).to.have.html('<script a="100"></script>');
        expect(script).to.have.prop('a', '100');
        expect(script).to.have.prop('b', true);
    });

    it('should support `hidden` attribute', function() {
        const script = shallow(<Script hidden />);

        expect(script).to.be.present();
        expect(script).to.have.html(null);
    });
});
