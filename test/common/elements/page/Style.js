import React from 'react';

import {describe, it} from 'mocha';
import chai from 'chai';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

const {expect} = chai;

import Style from '../../../../lib/elements/page/Style';

describe('<Style> component', function() {
    it('should allow empty content', function() {
        const script = shallow(<Style></Style>);

        expect(script).to.be.present();
        expect(script).to.be.blank();
        expect(script).to.have.html('<style></style>');
    });

    it('should allow non-empty content', function() {
        const script = shallow(<Style>{"body { color: red; }"}</Style>);

        expect(script).to.be.present();
        expect(script).to.have.html('<style>body { color: red; }</style>');
    });

    it('should support any optional attribute', function() {
        const script = shallow(<Style a="100" b={true} />);

        expect(script).to.be.present();
        expect(script).to.have.html('<style a="100"></style>');
        expect(script).to.have.prop('a', '100');
        expect(script).to.have.prop('b', true);
    });

    it('should support `hidden` attribute', function() {
        const script = shallow(<Style hidden />);

        expect(script).to.be.present();
        expect(script).to.have.html(null);
    });
});
