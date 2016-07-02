FROM ubuntu:14.04

RUN apt-get update && apt-get install -y python-pip git-all

RUN pip install behave==1.2.5

RUN git clone https://github.com/Gimpneek/victor.git -b react_rad

WORKDIR /victor/rad

CMD behave
