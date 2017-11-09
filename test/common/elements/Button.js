import React from 'react';

import {describe, it} from 'mocha';
import chai from 'chai';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({adapter: new Adapter()});

import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

const {expect} = chai;

import {Button} from '../../../lib/elements/button/';

describe('<Button> component', function() {
    it('should allow empty content', function() {
        const button = shallow(<Button></Button>);

        expect(button).to.be.present();
        expect(button).to.be.blank();
    });
});
