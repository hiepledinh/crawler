import cv2
import argparse
import numpy as np
import shutil
import glob
import os

ap = argparse.ArgumentParser()

ap.add_argument('-c', '--config', default='D:/workspace/python/object_detection/yolov3.cfg',
                help = 'path to yolo config file')
ap.add_argument('-w', '--weights', default='D:/workspace/python/object_detection/yolov3.weights',
                help = 'path to yolo pre-trained weights')
ap.add_argument('-cl', '--classes', default='D:/workspace/python/object_detection/yolov3.txt',
                help = 'path to text file containing class names')
args = ap.parse_args()

desFolder = "D:/workspace/untitled/public/person/"
classes = []
with open(args.classes, 'r') as f:
    classes = [line.strip() for line in f.readlines()]

def get_output_layers(net):    
    layer_names = net.getLayerNames()    
    output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    return output_layers

def draw_prediction(img, class_id, confidence, x, y, x_plus_w, y_plus_h):
    label = str(classes[class_id])
    cv2.rectangle(img, (x,y), (x_plus_w-1,y_plus_h-1), (0, 255, 0), 2)
    cv2.putText(img, label, (x+5,y+15), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

def personDetection(imgFile):
    image = cv2.imread(imgFile)

#    Width = image.shape[1]
#    Height = image.shape[0]
    scale = 0.00392

    net = cv2.dnn.readNet(args.weights, args.config)
    blob = cv2.dnn.blobFromImage(image, scale, (416,416), (0,0,0), True, crop=False)
    net.setInput(blob)

    outs = net.forward(get_output_layers(net))

    class_ids = []
    confidences = []
    boxes = []
    conf_threshold = 0.6
    nms_threshold = 0.4

    for out in outs:
        check = 0;
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5 and str(classes[class_id])=='person':
#                center_x = int(detection[0] * Width)
#                center_y = int(detection[1] * Height)
#                w = int(detection[2] * Width)
#                h = int(detection[3] * Height)
#                x = center_x - w / 2
#                y = center_y - h / 2
#                class_ids.append(class_id)
#                confidences.append(float(confidence))
#                boxes.append([x, y, w, h])
                print "Find a person with {0} confidence!".format(confidence)
                shutil.move(imgFile,desFolder+os.path.basename(imgFile))
                check=1;
                break
        if check==1:
            break

#    indices = cv2.dnn.NMSBoxes(boxes, confidences, conf_threshold, nms_threshold)
#    for i in indices:
#        i = i[0]
#        box = boxes[i]
#        x = box[0]
#        y = box[1]
#        w = box[2]
#        h = box[3]
#        draw_prediction(image, class_ids[i], confidences[i], x, y, x+w, y+h)
#    cv2.imshow(os.path.basename(imgFile),image)
#    cv2.waitKey(0)

files = glob.glob("D:/workspace/untitled/public/images/*.jpg")

print "Found {0} images in folder!".format(len(files))

for imgFile in files:
    print "File {0} is processing...".format(os.path.basename(imgFile))
    personDetection(imgFile)
