'use strict';

// Set modules that should be globally accessible during testing
global.sinon = require('sinon'),
global.assert = require('chai').assert,
global.leche = require('leche'),
global.proxyquire = require('proxyquire');
global.q = require('q');

// Test conf
process.env.DATABASE_URL = 'postgres://abc:abc123@ec2.aws.com:0001/test';
