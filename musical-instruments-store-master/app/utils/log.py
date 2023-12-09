import datetime
import json
import os.path
from datetime import time
from functools import wraps

import leancloud

INFO = 0
WARNING = 1
ERROR = 2


dir = './logs/'


def slice(str,len):
    return str[:min(len,str.__len__())]


def logging(timeout=None,cout=False,max_len=100):
    def decorator(func):
        @wraps(func)
        def wrap(*args, **kwargs):
            level=0
            level_describe=''
            start_time = datetime.datetime.now(tz=datetime.timezone.utc)
            message = {'execute': func.__name__, 'args': args, 'kwargs': kwargs, 'return': '',
                       'start_time': str(start_time), 'end_time': '',
                       'exception': ''}

            res = None
            try:
                res = func(*args, **kwargs)
            except Exception as e:
                print(e)
                message['exception'] = e.__str__()
                level_describe='Exception'
                level = 2
            finally:
                end_time=datetime.datetime.now(tz=datetime.timezone.utc)
                message['end_time'] = str(end_time)
                if timeout is not None:
                    if (end_time-start_time).microseconds > timeout and level!=2:
                        level = 1
                        level_describe = 'Timeout'
            message['return'] = slice(str(res),max_len)
            record(level=level, content=message,level_describe=level_describe,cout=cout)
            return res
        return wrap
    return decorator


def record(record_time=None,
           content=None,
           level=INFO,
           level_describe='',
           cout=False):
    if content is None:
        content = {}
    if record_time is None:
        record_time=datetime.datetime.now(tz=datetime.timezone.utc)
    if level is 0:
        level='INFO'
    elif level is 1:
        level='WARNING'
    elif level is 2:
        level='ERROR'
    s="[{}][{}][{}]({})\n".format(level,record_time,level_describe,json.dumps(content))
    if cout:
        print(s)
        pass

    path=os.path.join(dir,str(datetime.datetime.now().date())+".log")
    if not os.path.isdir(dir):
        os.makedirs(dir)
    with open(path,'a') as f:
        f.writelines(s)
