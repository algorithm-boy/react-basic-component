#! /usr/bin/expect

set timeout 600
spawn npm login
expect "*Username*"
send "jenkins\n"
expect "*Password*"
send "jenkins\n"
exit 0