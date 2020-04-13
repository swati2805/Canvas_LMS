var connection = require('./kafka/Connection');

var Login = require('./services/login');
var Signup = require('./services/signup');
var ProfileDetails = require('./services/profilepage');
var addCourse = require('./services/addCourse');
var dropCourse = require('./services/dropCourse');
var home = require('./services/home');
var uploadassign = require('./services/uploadassign');
var uploadnotes = require('./services/uploadnotes');
var submitassign = require('./services/submitassign');
var submitgrades = require('./services/submitgrades');
var Search = require('./services/search');
var addquiz = require('./services/addquiz');
var addann = require('./services/addann');
var viewppl = require('./services/viewppl');
var submitquiz = require('./services/submitquiz');
var sendmessages = require('./services/sendmessages');
var getmessages = require('./services/getmessages');
var updateprofile = require('./services/updateprofile');

function handleTopicRequest(topic_name, function_name){

    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();

    console.log('server is running');
    consumer.on('message', function(message){
        console.log('message recieved for ' + topic_name + " " + function_name);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        function_name.handle_request(data.data, function(err, res){
            console.log('After request handling: ', res);
            var payload = [{
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId : data.correlationId,
                    data : res
                }),
                partition: 0
            }];

            producer.send(payload, function(err, data){
                console.log('Data: ', data);
            });
            return;

        });
    });
}

handleTopicRequest("login", Login);
handleTopicRequest("signup", Signup);
handleTopicRequest("profilepage", ProfileDetails);
handleTopicRequest("addcourse", addCourse);
handleTopicRequest("dropcourse", dropCourse);
handleTopicRequest("search", Search);
handleTopicRequest("home", home);
handleTopicRequest("uploadassign", uploadassign);
handleTopicRequest("uploadnotes", uploadnotes);
handleTopicRequest("submitassign", submitassign);
handleTopicRequest("submitgrades", submitgrades);
handleTopicRequest("addquiz", addquiz);
handleTopicRequest("addann", addann);
handleTopicRequest("viewppl", viewppl);
handleTopicRequest("submitquiz", submitquiz);
handleTopicRequest("sendmessages", sendmessages);
handleTopicRequest("getmessages", getmessages);
handleTopicRequest("updateprofile", updateprofile);